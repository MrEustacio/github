document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/api/peliculas')
        .then(response => response.json())
        .then(data => {
            const peliculasContainer = document.getElementById('peliculas-container');
            data.forEach(pelicula => {
                const peliculaElement = document.createElement('div');
                peliculaElement.classList.add('pelicula');
                peliculaElement.innerHTML = `
                    <h2>${pelicula.titulo}</h2>
                    <p><strong>Género:</strong> ${pelicula.genero}</p>
                    <p><strong>Director:</strong> ${pelicula.director}</p>
                    <p><strong>Año:</strong> ${pelicula.año}</p>
                    <p>${pelicula.sinopsis}</p>
                `;
                peliculasContainer.appendChild(peliculaElement);
            });
        })
        .catch(error => console.error('Error:', error));
});
