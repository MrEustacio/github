const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'peliculas_db'
});

db.connect(err => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
    } else {
        console.log('Conectado a la base de datos.');
    }
});

app.use(express.json());


app.get('/api/peliculas', (req, res) => {
    const query = 'SELECT * FROM peliculas';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});


app.get('/api/peliculas/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM peliculas WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});


app.post('/api/peliculas', (req, res) => {
    const { titulo, genero, director, año, duracion, sinopsis } = req.body;
    const query = 'INSERT INTO peliculas (titulo, genero, director, año, duracion, sinopsis) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [titulo, genero, director, año, duracion, sinopsis], (err, result) => {
        if (err) throw err;
        res.status(201).json({ id: result.insertId });
    });
});


app.put('/api/peliculas/:id', (req, res) => {
    const { id } = req.params;
    const { titulo, genero, director, año, duracion, sinopsis } = req.body;
    const query = 'UPDATE peliculas SET titulo = ?, genero = ?, director = ?, año = ?, duracion = ?, sinopsis = ? WHERE id = ?';
    db.query(query, [titulo, genero, director, año, duracion, sinopsis, id], (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

app.delete('/api/peliculas/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM peliculas WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

app.listen(port, () => {
    console.log(`API de películas escuchando en http://localhost:${port}`);
});
