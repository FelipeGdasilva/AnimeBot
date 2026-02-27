const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/animes', (req, res) => {
    // 1. Garante o caminho correto para o arquivo de dados
    const caminhoDoArquivo = path.join(__dirname, 'dados_animes.json');

    fs.readFile(caminhoDoArquivo, 'utf8', (err, data) => {
        if (err) {
            console.error("Erro ao ler arquivo:", err);
            return res.status(500).json({ mensagem: "Erro ao ler os dados" });
        }
        try {
            // 2. Converte e envia
            const jsonSaida = JSON.parse(data);
            res.json(jsonSaida);
        } catch (parseErr) {
            res.status(500).json({ mensagem: "Erro no formato do JSON" });
        }
    });
});

const PORT = 3001; 
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});