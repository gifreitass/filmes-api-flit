const movieContent = document.getElementById('movieContent')

//LISTANDO OS DADOS DA API
async function moviesApi() {
    await fetch('https://apigenerator.dronahq.com/api/DshgzEBY/movies')
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            renderMoviesCards(response)
        })
}

moviesApi()

//FUNÇÃO PARA VERIFICAR O GÊNERO DO FILME
interface iGenre {
    id: number,
    name: string
}

async function moviesGenre(genreNumber: number[]) {
    const filteredGenres = await fetch('https://apigenerator.dronahq.com/api/Dd1Qk1iN/genre')
        .then(function (response) {
            return response.json();
        })
        .then(function (data: iGenre[]) {
            const genres: string[] = []

            data.forEach(genre => {
                genreNumber.forEach(number => {
                    if (genre.id === number) {
                        genres.push(genre.name)
                    }
                });
            });

            return genres
        })
    return filteredGenres
}

//FUNÇÃO PARA PERCORRER OS OBJETOS DO ARRAY DE FILMES
function renderMoviesCards(movieList: iMovie[]) {
    let genre: string[] = []
    movieList.forEach(async movie => {
        if (movie.genre !== null) {
            genre = await moviesGenre(movie.genre)
        }
        let movieCard = `<div class="movieCard">
        <p><b>Título: </b>${movie.title}<br>
        <b>Sinopse: </b>${movie.overview}<br>
        <b>Gênero: </b>${genre.join(', ')}<br>
        <b>Nota: </b>${movie.vote_average}
        </p>
    </div>`
        movieContent?.insertAdjacentHTML('beforeend', movieCard)
    });
}

//CRIANDO UMA FUNÇÃO PARA ADICIONAR UM NOVO FILME NA API
interface iMovie {
    title: string | HTMLElement | null,
    overview: string | HTMLElement | null,
    genre: number[] | null,
    vote_average: number | HTMLElement | null,
    id?: number | HTMLElement | null
}

function addMovie(newMovie: iMovie) {
    let myInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newMovie)
    }
    fetch('https://apigenerator.dronahq.com/api/DshgzEBY/movies', myInit)
        .then(function (response) {
            window.location.href = "file:///C:/Users/giova/OneDrive/Documentos/DoDev/Flit/modulo3/filmes-api/index.html";
            return response.json()
        })
}

function submit(e: any) {
    e.preventDefault()
    const titleValue = document.getElementById('title') as HTMLInputElement
    const overviewValue = document.getElementById('overview') as HTMLInputElement
    const genreValue = document.getElementById('genre') as HTMLInputElement
    const voteAverage = document.getElementById('voteAverage') as HTMLInputElement

    const genreStringValues = genreValue.value.split(',')

    const genreNumberValues = genreStringValues.map(stringValue => {
        return Number(stringValue)
    })

    const valueInputs: iMovie = {
        title: titleValue.value,
        overview: overviewValue.value,
        genre: genreNumberValues,
        vote_average: parseFloat(voteAverage.value)
    }

    addMovie(valueInputs)
}

const buttonSubmit = document.getElementById('submit')
buttonSubmit?.addEventListener('click', submit)
