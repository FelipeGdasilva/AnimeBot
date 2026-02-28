// TODO: Substituir localhost pela URL do deploy quando o backend estiver online
const input = document.getElementById("mood-input");
const button = document.getElementById("search-button");
const resultsContainer = document.getElementById("movies-grid"); // Usaremos este como padrão
const resultsSection = document.getElementById("results");

input.addEventListener("input", () => {
  button.disabled = input.value.trim() === "";
});

button.addEventListener("click", async () => {
  const userText = input.value.trim();
  if (!userText) return;

  // Estado visual: Feedback imediato ao usuário enquanto o processamento ocorre
  button.disabled = true;
  button.innerText = "Buscando..."; 
  resultsSection.style.display = "block";

  // ESTRATÉGIA DE RESILIÊNCIA (FALLBACK):
  // Como a integração com a IA externa (n8n) pode oscilar, implementamos uma 
  // resposta imediata do banco de dados local para garantir a disponibilidade.
  resultsContainer.innerHTML = `
    <div style="grid-column: 1/-1; text-align: center; color: #00f2ff; padding: 20px;">
      <div class="loading"></div>
      <p>🤖 <b>Nota do AnimeBot:</b> Nossa IA está em treinamento. <br>
      Exibindo destaques do catálogo local para garantir sua experiência:</p>
    </div>
  `;

  try {
    // Consumo de API Local: Buscando dados do servidor Node.js (Porta 3001)
    const response = await fetch("http://localhost:3001/animes");
    if (!response.ok) throw new Error("Erro na comunicação com o servidor");

    const objetoReal = await response.json();
    
    // Tratamento de Dados: Verificando a estrutura do JSON antes da renderização
    let animesParaRenderizar = [];
    if (objetoReal.animes && Array.isArray(objetoReal.animes)) {
        animesParaRenderizar = objetoReal.animes;
    } else if (Array.isArray(objetoReal)) {
        animesParaRenderizar = objetoReal;
    }

    if (animesParaRenderizar.length > 0) {
      renderAnimes(animesParaRenderizar);
    } 

  } catch (error) {
    // Tratamento de Erros: Feedback visual caso o servidor backend esteja offline
    resultsContainer.innerHTML = "<p style='color:white'>Erro ao conectar ao Backend. Verifique se o server.js está rodando!</p>";
  } finally {
    button.disabled = false;
    button.innerText = "Encontrar Animes";
  }
});

/**
 * Renderiza os cards de animes no DOM com tratamento de erros de mídia.
 * @param {Array} animes - Lista de objetos contendo dados dos animes (title, description, image).
 */
function renderAnimes(animes) {
  // Nota: Não limpamos o container aqui para manter a "Mensagem de Resiliência" visível no topo.
  
  animes.forEach((anime) => {
    const card = document.createElement("div");
    card.classList.add("movie-card", "fade-in");

    // TRATAMENTO DE IMAGEM (FALLBACK):
    // Se a URL da imagem estiver vazia ou falhar no carregamento, usamos um placeholder.
    // Isso garante que o layout do card nunca fique quebrado ou "vazio".
    const imageSource = anime.image && anime.image.trim() !== "" 
      ? anime.image 
      : "https://via.placeholder.com/300x450?text=Imagem+Indisponível";

    card.innerHTML = `
      <div class="movie-poster">
        <img 
          src="${imageSource}" 
          alt="Poster de ${anime.title || 'Anime'}" 
          onerror="this.onerror=null; this.src='https://via.placeholder.com/300x450?text=Erro+ao+Carregar';"
        >
      </div>
      <div class="movie-info">
        <h3 class="movie-title">${anime.title || "Título não disponível"}</h3>
        <p class="movie-overview">${anime.description || "Nenhuma descrição foi fornecida para este título no momento."}</p>
      </div>
    `;
    
    resultsContainer.appendChild(card);
  });
}