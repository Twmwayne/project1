var searchButton = document.querySelector("#search-button");
var searchInput = document.querySelector("#search-input");
var unwatchedMovie = document.querySelector("#movies-unwatched");
var apiKey = "77cf51e8d01e26a06a5030f3b856fe9e"

searchButton.addEventListener("click", function (event) {
  event.preventDefault();
  movieAdd = searchInput.value.trim();
  console.log(movieAdd);
  var queryOMDB = "https://www.omdbapi.com/?t=" + movieAdd + "&apikey=10e7754b";
  var queryTMDB = "https://api.themoviedb.org/3/search/multi?api_key=" + apiKey + "&language=en-US&query=" + movieAdd + "&include_adult=false"

  // https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&page=1&include_adult=false

// Perfoming an AJAX GET request to our queryURL
  $.ajax({
    url: queryOMDB,
    method: "GET"
  })
    .then(function (responseOMDB) {
      console.log(responseOMDB);
      var quickAdd = responseOMDB.Type;

      if (quickAdd === "movie") {
        var newMovie = document.createElement('row');
        //no element called row - can assign a class of row - it would need to be in a table (do we want to create a table)
        // newMovie.setAttribute("class", "list-group-item");
        newMovie.setAttribute("id", "new-movie-row")
        newMovie.textContent = responseOMDB.Title;
        unwatchedMovie.appendChild(newMovie);
      }

// we need to add IF statement for Series 

      $.ajax({
        url: queryTMDB,
        method: "GET"
      })

        .then(function (responseTMDB) {
          console.log(responseTMDB);
          $(".first-container").prepend(`
          <img src="https://image.tmdb.org/t/p/w200${responseTMDB.results[0].poster_path}"></img>
          `)

          // var moviePosterDiv = document.createElement('col');
          // newMovie.appendChild(moviePosterDiv);
          // var moviePoster = document.createElement('img');
          // var posterUrl = responseTMDB.results[0].poster_path;

          // moviePoster.setAttribute("src", "https://image.tmdb.org/t/p/w200" + posterUrl);
          // console.log(responseTMDB.results[0].poster_path)
          // newMovie.appendChild(moviePosterDiv);
          // moviePosterDiv.appendChild(moviePoster);
        })
        // need to get the image to append to the row/ (want the img, Title, Rating, and Rotten Tomato Score)  

})
});


//Array for next ten list (with movie posters, use bootstrap carousel)
// $('.carousel').carousel({
//   interval: 2000
// })
//Dashboard list
//Time watched clock. Convert to hours/days.

// Number.prototype.padDigit = function () {
//   return (this < 10) ? '0' + this : this;
// }

// $("#addTimes").on('click', function () {
// var t1 = "00:00";
// var mins = 0;
// var hrs = 0;
//   $('input').each(function () {
//       t1 = t1.split(':');
//       var t2 = $(this).val().split(':');
//       mins = Number(t1[1]) + Number(t2[1]);
//       minhrs = Math.floor(parseInt(mins / 60));
//       hrs = Number(t1[0]) + Number(t2[0]) + minhrs;
//       mins = mins % 60;
//       t1 = hrs.padDigit() + ':' + mins.padDigit()

//   });
//   $('#timeSum').text(t1);
// });

//IMDB top 100
//Rotten tomatoes (OMDB)
//Longest queued. Function to grab the oldest entries in local storage
//Kid friendly. IMDB kids movie list
