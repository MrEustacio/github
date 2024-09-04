CREATE DATABASE peliculas_db;

USE peliculas_db;

CREATE TABLE peliculas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    genero VARCHAR(100) NOT NULL,
    director VARCHAR(255),
    año INT,
    duracion INT, 
    sinopsis TEXT
);

CREATE TABLE comentarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pelicula_id INT,
    usuario VARCHAR(255) NOT NULL,
    comentario TEXT,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (pelicula_id) REFERENCES peliculas(id) ON DELETE CASCADE
);
