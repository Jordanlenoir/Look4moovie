document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');
    if (movieId) {
        fetchMovieDetails(movieId);
    }
});

async function fetchMovieDetails(id) {
    const url = `https://www.omdbapi.com/?i=${id}&apikey=9e733572`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.Response === "True") {
        displayMovieDetails(data);
    } else {
        document.getElementById('movie-details').innerHTML = '<p>Aucun détail trouvé!</p>';
    }
}

function displayMovieDetails(movie) {
    const movieDetails = document.getElementById('movie-details');
    movieDetails.innerHTML = `
        <div class="movie-details">
            <img src="${movie.Poster !== "N/A" ? movie.Poster : 'placeholder.jpg'}" alt="${movie.Title}">
            <h1>${movie.Title}</h1>
            <p><b>Year:</b> ${movie.Year}</p>
            <p><b>Rated:</b> ${movie.Rated}</p>
            <p><b>Released:</b> ${movie.Released}</p>
            <p><b>Genre:</b> ${movie.Genre}</p>
            <p><b>Writer:</b> ${movie.Writer}</p>
            <p><b>Actors:</b> ${movie.Actors}</p>
            <p><b>Plot:</b> ${movie.Plot}</p>
            <p><b>Language:</b> ${movie.Language}</p>
            <p><b>Awards:</b> ${movie.Awards}</p>
        </div>
    `;
}