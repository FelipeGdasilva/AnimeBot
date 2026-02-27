![Demonstração do AnimeBot](./screenshots/demonstração-animebot.gif)

# 🤖 AnimeBot AI - Recomendador por Emoção

Este é um projeto **Fullstack** que utiliza Inteligência Artificial e um servidor personalizado para recomendar animes baseados no humor ou intenção do usuário.

## 🌟 O Diferencial e Resiliência Técnica
Um dos maiores desafios deste projeto foi garantir a disponibilidade das recomendações. Originalmente, o fluxo dependia exclusivamente do **n8n**, o que tornava o sistema vulnerável a variações de entrada e quedas de serviço externo.

**A Solução de Engenharia:** Implementei um **Back-end em Node.js** que atua como uma camada de resiliência (fallback) [cite: 2026-02-24]. 
- **Inteligência:** Utiliza Engenharia de Prompt no Google Gemini para interpretar emoções e gerar saídas limpas [cite: 2026-02-15].
- **Resiliência:** Caso a API externa esteja indisponível, o servidor Node.js assume o controle e serve um catálogo local otimizado, garantindo que o usuário sempre receba sugestões, incluindo clássicos como **Bleach** ⚔️.

## 🛠️ Tecnologias Utilizadas
- **Front-end:** HTML5, CSS3 (Glassmorphism & Neon Effects), JavaScript Moderno (Fetch API) [cite: 2026-01-22].
- **Back-end:** **Node.js & Express** (Servidor de API local).
- **Automação:** n8n (Workflow original para orquestração de IA).
- **IA:** Google Gemini para análise de sentimento e curadoria emocional.
- **Dados:** Jikan API & Banco de Dados Local (JSON).

## 📂 Estrutura do Projeto
- `/src`: Interface visual e lógica de consumo da API.
- `/backend/server.js`: Servidor Node.js para gerenciamento de dados e fallback.
- `/backend/dados_animes.json`: Catálogo local para garantir 100% de disponibilidade.
- `/backend/workflow_animebot.json`: Estrutura original da automação n8n.

## 🚀 Como Executar
1. Clone o repositório.
2. Certifique-se de ter o **Node.js** instalado.
3. Navegue até a pasta `/backend` e inicie o servidor:
   ```bash
   node server.js