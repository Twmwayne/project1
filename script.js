var searchButton = document.querySelector("#search-button");
var searchInput = document.querySelector("#search-input");
var unwatchedMovieLi = document.querySelector("#movie-uw-list");


searchButton.addEventListener("click", function (event) {
  event.preventDefault();
  movieAdd = searchInput.value.trim();
  console.log(movieAdd);
  var queryOMDB = "https://www.omdbapi.com/?t=" + movieAdd + "&apikey=10e7754b";
  var queryTMDB = "https://api.themoviedb.org/3/movie/" + movieAdd + "/images?api_key=77cf51e8d01e26a06a5030f3b856fe9e&language=en-US"

// Perfoming an AJAX GET request to our queryURL
  $.ajax({
    url: queryOMDB,
    method: "GET"
  })
    .then(function (responseOMDB) {
      console.log(responseOMDB);
      var quickAdd = responseOMDB.Type;
      console.log(quickAdd);

      if (quickAdd === "movie") {
        var newMovie = document.createElement('li');
        newMovie.setAttribute("class", "list-group-item");
        newMovie.textContent = responseOMDB.Title;
        unwatchedMovieLi.appendChild(newMovie);
      }

      $.ajax({
        url: queryTMDB,
        method: "GET"
      })

        .then(function (responseTMDB) {
          console.log(responseTMDB);
          var moviePosterDiv = document.createElement('col');
          unwatchedMovieLi.appendChild(moviePosterDiv);
          var moviePoster = document.createElement('img');
          moviePoster.setAttribute("src", responseTMDB.poster_path);
          moviePosterDiv.appendChild(moviePoster);
        })

})
});


//Event listener (quick add button)
//Array for next ten list (with movie posters, use bootstrap carousel)
// $('.carousel').carousel({
//   interval: 2000
// })
//Dashboard list
//Time watched clock. Convert to hours/days.
//IMDB top 100
//Rotten tomatoes (OMDB)
//Longest queued. Function to grab the oldest entries in local storage
//Kid friendly. IMDB kids movie list
