"use strict";
const movieContent = document.getElementById('movieContent');
//LISTANDO OS DADOS DA API
async function moviesApi() {
    await fetch('https://apigenerator.dronahq.com/api/DshgzEBY/movies')
        .then(function (response) {
        return response.json();
    })
        .then(function (response) {
        renderMoviesCards(response);
    });
}
moviesApi();
async function moviesGenre(genreNumber) {
    const filteredGenres = await fetch('https://apigenerator.dronahq.com/api/Dd1Qk1iN/genre')
        .then(function (response) {
        return response.json();
    })
        .then(function (data) {
        const genres = [];
        data.forEach(genre => {
            genreNumber.forEach(number => {
                if (genre.id === number) {
                    genres.push(genre.name);
                }
            });
        });
        return genres;
    });
    return filteredGenres;
}
//FUNÇÃO PARA PERCORRER OS OBJETOS DO ARRAY DE FILMES
function renderMoviesCards(movieList) {
    let genre = [];
    movieList.forEach(async (movie) => {
        if (movie.genre !== null) {
            genre = await moviesGenre(movie.genre);
        }
        let movieCard = `<div class="movieCard">
        <p><b>Título: </b>${movie.title}<br>
        <b>Sinopse: </b>${movie.overview}<br>
        <b>Gênero: </b>${genre.join(', ')}<br>
        <b>Nota: </b>${movie.vote_average}
        </p>
    </div>`;
        movieContent === null || movieContent === void 0 ? void 0 : movieContent.insertAdjacentHTML('beforeend', movieCard);
    });
}
function addMovie(newMovie) {
    let myInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newMovie)
    };
    fetch('https://apigenerator.dronahq.com/api/DshgzEBY/movies', myInit)
        .then(function (response) {
        window.location.href = "file:///C:/Users/giova/OneDrive/Documentos/DoDev/Flit/modulo3/filmes-api/index.html";
        return response.json();
    });
}
function submit(e) {
    e.preventDefault();
    const titleValue = document.getElementById('title');
    const overviewValue = document.getElementById('overview');
    const genreValue = document.getElementById('genre');
    const voteAverage = document.getElementById('voteAverage');
    const genreStringValues = genreValue.value.split(',');
    const genreNumberValues = genreStringValues.map(stringValue => {
        return Number(stringValue);
    });
    const valueInputs = {
        title: titleValue.value,
        overview: overviewValue.value,
        genre: genreNumberValues,
        vote_average: parseFloat(voteAverage.value)
    };
    addMovie(valueInputs);
}
const buttonSubmit = document.getElementById('submit');
buttonSubmit === null || buttonSubmit === void 0 ? void 0 : buttonSubmit.addEventListener('click', submit);
//# sourceMappingURL=index.js.map