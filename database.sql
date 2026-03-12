-- Criando a tabela de animes
CREATE TABLE animes (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    genero VARCHAR(100),
    sinopse TEXT,
    tag_emocional VARCHAR(50)
);

CREATE TABLE historico_recomendacoes (
    id SERIAL PRIMARY KEY,
    emocao_digitada VARCHAR(50),
    anime_sugerido_id INT,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_anime FOREIGN KEY (anime_sugerido_id) REFERENCES animes(id)
);