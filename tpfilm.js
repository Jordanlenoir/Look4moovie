async function searchMovies() {
    const searchBox = document.getElementById('movie-search-box');
    const searchTerm = searchBox.value;
    const url = `https://www.omdbapi.com/?s=${searchTerm}&apikey=9e733572`;
    
    const response = await fetch(url);
    const data = await response.json();

    if (data.Response === "True") {
        displayMovies(data.Search);
    } else {
        document.getElementById('AllMovie').innerHTML = `<p>Aucun film trouvé!</p>`;
    }
}

async function displayMovies(movies) {
    const allMovieContainer = document.getElementById('AllMovie');
    allMovieContainer.innerHTML = '';

    for (const movie of movies) {
        const movieDetails = await fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=9e733572`);
        const details = await movieDetails.json();

        const movieHTML = `
            <div class="container" onclick="openMovieDetails('${details.imdbID}')">
                <img src="${details.Poster !== "N/A" ? details.Poster : 'placeholder.jpg'}" alt="${details.Title}">
                    <h3>${details.Title}</h3>
                    <div class="Descript"> 
                        <p><b>Year:</b> ${details.Year}</p>
                        <p><b>Rated:</b> ${details.Rated}</p>
                        <p><b>Released:</b> ${details.Released}</p>
                        <p><b>Genre:</b> ${details.Genre}</p>
                        <p><b>Writer:</b> ${details.Writer}</p>
                        <p><b>Actors:</b> ${details.Actors}</p>
                        <p><b>Language:</b> ${details.Language}</p>
                        <p><b>Awards:</b> ${details.Awards}</p>
                    </div><br>    
            </div>
        `;

        allMovieContainer.innerHTML += movieHTML;
    }
}

function openMovieDetails(id) {
    window.location.href = `tpfilm_one.html?id=${id}`;
}
