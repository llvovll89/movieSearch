//  api 키 - http://www.omdbapi.com/?i=tt3896198&apikey=62aef3d1

let key = "62aef3d1";
const movieNameInput = document.querySelector("#movie-name");
const searchBtn = document.querySelector(".btn");
const movieResult = document.querySelector(".movie-result");
const formEvent = document.querySelector("#form");

const getMovie = () => {
  let movieName = movieNameInput.value;
  const url = `http://www.omdbapi.com/?t=${movieName}&apikey=${key}`;

  if (movieName.length <= 0) {
    movieResult.innerHTML = `
            <h3 class="err-msg>
                죄송합니다. 영화 제목 확인해주세요
            </h3>
            `;
  } else {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.Response === "True") {
          movieResult.innerHTML = `
            <div class="movie-info">
            <img src=${data.Poster} alt="" class="movie-poster">
            <div class="movie-content">
                <h2 class="title">${data.Title}</h2>
                <div class="point">
                    <img src="./assets/image/star.png" alt="평점" class="star">
                    <h4>${data.imdbRating}</h4>
                </div>
                <div class="subinfo">
                <span>${data.Released}</span>
                <span>${data.BoxOffice}</span>
                    <span>${data.Runtime}</span>
                </div>
                <div class="director">
                    <div>${data.Genre.split(",").join("</div><div>")}</div>
                </div>
            </div>
        </div>
        <div class="list-item">
        <h3>Plot:</h3>
        <p>${data.Plot}</p>
        <h3>Cast: </h3>
        <p>${data.Actors}</p>
        </div>
            `;
        }
        else {
            movieResult.innerHTML = `
            <h3 class="err-msg>
            죄송합니다. 영화 제목 확인해주세요
        </h3>
        `
        }
      })
      .catch(() => {
        movieResult.innerHTML = `
        <h3 class="err-msg>
        에러발생!!
    </h3>
    `
      })
  }
};

searchBtn.addEventListener("click", () => {
  getMovie();
});

formEvent.addEventListener("submit", submitFn);

function submitFn(e) {
  e.preventDefault();
  getMovie();
}
