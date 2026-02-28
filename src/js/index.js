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

  button.disabled = true;
  button.innerText = "Buscando..."; 
  
  resultsSection.style.display = "block";

  // 1. Limpa tudo e coloca a mensagem de IA
  resultsContainer.innerHTML = `
    <div style="grid-column: 1/-1; text-align: center; color: #00f2ff; padding: 20px;">
      <div class="loading"></div>
      <p>🤖 <b>Nota do AnimeBot:</b> Nossa IA está em treinamento para te entender melhor.<br>
      Enquanto isso, confira os destaques do nosso catálogo para o seu humor:</p>
    </div>
  `;

  try {
    const response = await fetch("http://localhost:3001/animes");
    if (!response.ok) throw new Error("Erro na requisição");

    const objetoReal = await response.json();
    
    let animesParaRenderizar = [];
    if (objetoReal.animes && Array.isArray(objetoReal.animes)) {
        animesParaRenderizar = objetoReal.animes;
    } else if (Array.isArray(objetoReal)) {
        animesParaRenderizar = objetoReal;
    }

    if (animesParaRenderizar.length > 0) {
      // 2. CHAMA A FUNÇÃO SEM LIMPAR O CONTAINER DE NOVO
      renderAnimes(animesParaRenderizar);
    } 

  } catch (error) {
    resultsContainer.innerHTML = "<p style='color:white'>Erro ao conectar. O servidor está rodando?</p>";
  } finally {
    button.disabled = false;
    button.innerText = "Encontrar Animes";
  }
});

// REMOVA O "resultsContainer.innerHTML = """ DE DENTRO DESTA FUNÇÃO:
function renderAnimes(animes) {
  // resultsContainer.innerHTML = "";  <-- COMENTE OU APAGUE ESSA LINHA!
  
  animes.forEach((anime) => {
    const card = document.createElement("div");
    card.classList.add("movie-card", "fade-in");
    card.innerHTML = `
      <div class="movie-poster">
        <img src="${anime.image}" alt="${anime.title}">
      </div>
      <div class="movie-info">
        <h3 class="movie-title">${anime.title}</h3>
        <p class="movie-overview">${anime.description}</p>
      </div>
    `;
    resultsContainer.appendChild(card);
  });
}