const movieContent = document.getElementById('movieContent')

//LISTANDO OS DADOS DA API
function moviesApi() {
    fetch('https://apigenerator.dronahq.com/api/DshgzEBY/movies')
        .then(function (response) {
            return response.json();
        })
        .then(function (response){
            renderMoviesCards(response)
        })
}

moviesApi()

//FUNÇÃO PARA PERCORRER OS OBJETOS DO ARRAY DE FILMES
function renderMoviesCards(movieList: iMovie[]){
    movieList.forEach(movie => {
        let movieCard = `<div class="movieCard">
        <p><b>Título: </b>${movie.title}<br>
        <b>Sinopse: </b>${movie.overview}<br>
        <b>Gênero: </b>${movie.genre}<br>
        <b>Nota: </b>${movie.vote_average}
        </p>
    </div>`
    movieContent?.insertAdjacentHTML('beforeend', movieCard)
    });
}

// document.addEventListener('load', moviesApi)

//CRIANDO UMA FUNÇÃO PARA ADICIONAR UM NOVO FILME NA API
interface iMovie{
    title: string | HTMLElement | null,
    overview: string | HTMLElement | null,
    genre: string[] | HTMLElement | null,
    vote_average: number | HTMLElement | null,
    id?: number | HTMLElement | null
}

function addMovie(newMovie: iMovie){
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

function submit(e: any){
    e.preventDefault()
    const titleValue = document.getElementById('title') as HTMLInputElement
    const overviewValue = document.getElementById('overview') as HTMLInputElement
    const genreValue = document.getElementById('genre') as HTMLInputElement
    const voteAverage = document.getElementById('voteAverage') as HTMLInputElement

    const valueInputs: iMovie = {
        title: titleValue.value,
        overview: overviewValue.value,
        genre: genreValue.value.split(','),
        vote_average: parseFloat(voteAverage.value)
    }

    addMovie(valueInputs)
}

const buttonSubmit = document.getElementById('submit')
buttonSubmit?.addEventListener('click', submit)
