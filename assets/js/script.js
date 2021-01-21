const APIUrl =
  "https://api.themoviedb.org/3/movie/popular?api_key=1b9ed23ce1e10dc7db6e6df9d3a98fbd&language=en-US&page=1";
const SEARCHPATH_Url =
  "https://api.themoviedb.org/3/search/movie?api_key=1b9ed23ce1e10dc7db6e6df9d3a98fbd&language=en-US";

const IMGPATH = "https://image.tmdb.org/t/p/w500/";

const main = document.querySelector("main");
const searchButton = document.querySelector("#search");
const inputField = document.querySelector("#inputValue");
const searchedMovie = document.querySelector("#searched-movies");
const trailerVideo = document.querySelector(".trailer");
const latestButton = document.querySelector(".latest");
const topRatedButton = document.querySelector(".toprated");
const upcomingButton = document.querySelector(".upcoming");

function generateUrl(path) {
  const url = `https://api.themoviedb.org/3${path}?api_key=1b9ed23ce1e10dc7db6e6df9d3a98fbd&language=en-US`;
  return url;
}

function createSearchMovieContainer(data) {
  searchedMovie.innerHTML = "";
  if (data.results.length == 0) {
    console.log("No search result");
  }
  data.results.forEach((movie) => {
    const movieElement = document.createElement("div");
    movieElement.setAttribute("class", "movie");
    //movieElement.classList.add('movie');
    if (movie.poster_path) {
      movieElement.innerHTML = `
            <section class = "section">
                <img src=${IMGPATH + movie.poster_path} data-movie-id=${
        movie.id
      }/>
            </section>
            <div class="movie-info">
                <h3>${movie.title}</h3>
                <span>${movie.vote_average}</span>
            </div>
            <a href="#" onclick="toggle();">Watch Trailer</a>

            `;
      searchedMovie.appendChild(movieElement);
    }
  });
}

searchButton.onclick = function (event) {
  event.preventDefault();
  const value = inputField.value;
  const path = "/search/movie";
  const newURL = generateUrl(path) + "&query=" + value;
  fetch(newURL)
    .then((res) => res.json())
    .then((data) => {
      createSearchMovieContainer(data);
      console.log("Data: ", data);
    })
    .catch((error) => {
      console.log("Error: ", error);
    });

  console.log(value);
};

latestButton.onclick = function (event) {
  const path = "/movie/now_playing";
  const newURL = generateUrl(path);

  fetch(newURL)
    .then((res) => res.json())
    .then((data) => {
      createSearchMovieContainer(data);
      console.log("Data: ", data);
    })
    .catch((error) => {
      console.log("Error: ", error);
    });
};
topRatedButton.onclick = function (event) {
  const path = "/movie/top_rated";
  const newURL = generateUrl(path);

  fetch(newURL)
    .then((res) => res.json())
    .then((data) => {
      createSearchMovieContainer(data);
      console.log("Data: ", data);
    })
    .catch((error) => {
      console.log("Error: ", error);
    });
};
upcomingButton.onclick = function (event) {
  const path = "/movie/upcoming";
  const newURL = generateUrl(path);

  fetch(newURL)
    .then((res) => res.json())
    .then((data) => {
      createSearchMovieContainer(data);
      console.log("Data: ", data);
    })
    .catch((error) => {
      console.log("Error: ", error);
    });
};

//fetch movie information from tmdb database
async function getMovies() {
  const resp = await fetch(APIUrl);
  const respData = await resp.json();

  console.log(respData);

  //get array list of movies
  respData.results.forEach((movie) => {
    //create image
    //const img = document.createElement("img");
    const { poster_path, title, vote_average } = movie;
    const movieElement = document.createElement("div");

    movieElement.classList.add("movie");

    movieElement.innerHTML = `
        <section class = "section">
            <img src=${IMGPATH + movie.poster_path} data-movie-id=${movie.id}/>
        </section>
            <div class="movie-info">
                <h3>${title}</h3>
                <span>${vote_average}</span>
            </div>
            <a href="#" onclick="toggle()">Watch Trailer</a>
        `;

    //initialize path of image
    //img.src = IMGPATH + movie.poster_path;
    //append image to the body
    searchedMovie.appendChild(movieElement);
  });

  //return response
  return respData;
}

function toggle() {
  trailerVideo.classList.toggle("active");
  console.log("Toggling");
}
getMovies();
