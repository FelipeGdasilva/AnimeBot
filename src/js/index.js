const input = document.getElementById("mood-input");
const button = document.getElementById("search-button");
const resultsContainer = document.getElementById("movies-grid");
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
  resultsContainer.innerHTML = `
    <div style="grid-column: 1/-1; text-align: center; padding: 40px;">
      <div class="loading"></div>
      <p style="color:white; margin-top: 20px;">Acessando banco de dados local...</p>
    </div>
  `;

  try {
    const response = await fetch("http://localhost:3001/animes");
    if (!response.ok) throw new Error("Erro na requisição");

    const objetoReal = await response.json();
    console.log("Dados que o servidor enviou:", objetoReal); // <--- Veja isso no F12

    // Lógica para encontrar a lista de animes
    let animesParaRenderizar = [];
    if (objetoReal.animes && Array.isArray(objetoReal.animes)) {
        animesParaRenderizar = objetoReal.animes;
    } else if (Array.isArray(objetoReal)) {
        animesParaRenderizar = objetoReal;
    }

    if (animesParaRenderizar.length > 0) {
      renderAnimes(animesParaRenderizar);
    } else {
      resultsContainer.innerHTML = "<p style='color:white'>A lista de animes está vazia no arquivo JSON.</p>";
    }

  } catch (error) {
    resultsContainer.innerHTML = "<p style='color:white'>Erro ao conectar com o servidor. Verifique o terminal!</p>";
  } finally {
    button.disabled = false;
    button.innerText = "Encontrar Animes";
  }
});

function renderAnimes(animes) {
  resultsContainer.innerHTML = "";
  animes.forEach((anime) => {
    const card = document.createElement("div");
    card.classList.add("movie-card", "fade-in");
    const fallbackImage = "https://via.placeholder.com/300x450?text=Sem+Imagem";

    card.innerHTML = `
      <div class="movie-poster">
        <img src="${anime.image || fallbackImage}" alt="${anime.title}" onerror="this.src='${fallbackImage}';">
      </div>
      <div class="movie-info">
        <h3 class="movie-title">${anime.title || "Sem título"}</h3>
        <p class="movie-overview">${anime.description || "Sem descrição."}</p>
      </div>
    `;
    resultsContainer.appendChild(card);
  });
}