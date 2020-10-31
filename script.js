var searchButton = document.querySelector("#search-button");
var searchInput = document.querySelector("#search-input");
var movieDiv = document.querySelector("#movies");
var seriesDiv = document.querySelector("#series");
var apiKey = "77cf51e8d01e26a06a5030f3b856fe9e"
var watchedMovies = new Array();
var watchedSeries = new Array();

//global variables to make arrays from movies chosen
var cntr = 0
var names = new Array();
// var runtimes = new Array();
var runningTotal = new Array();
var timeTotal = 0;

//function to convert minutes to hours, minutes.
function timeConvert(n) {
  var num = n;
  var hours = (num / 60);
  var rhours = Math.floor(hours);
  var minutes = (hours - rhours) * 60;
  var rminutes = Math.round(minutes);
  return rhours.toString() + " hr(s) " + rminutes.toString() + " min(s)";
}

// provides display of time watched and sets to local memory
function incrementTotal(inp_time){
  var totalStr;

  timeTotal += inp_time;
  totalStr = timeConvert(timeTotal);
  
  localStorage.setItem("savedTime", totalStr)
  var storedTime = localStorage.getItem("savedTime");
  document.getElementById("time-watched-graphic").innerHTML = storedTime;
}

// Adds movies watched from user input
searchButton.addEventListener("click", function (event) {
  event.preventDefault();
  movieAdd = searchInput.value.trim();
  var queryOMDB = "https://www.omdbapi.com/?t=" + movieAdd + "&apikey=10e7754b";
  var queryTMDB = "https://api.themoviedb.org/3/search/multi?api_key=" + apiKey + "&language=en-US&query=" + movieAdd + "&include_adult=false"

  // Perfoming an AJAX GET request to OMDB for the title and runtime of the movie
  $.ajax({
    url: queryOMDB,
    method: "GET"

  })
    .then(function (responseOMDB) {
      var quickAdd = responseOMDB.Type;
      var tm = responseOMDB.Runtime;
      var st1 = "test";
      var rt_int = 0;
      names.push(responseOMDB.Title)

      // gets the runtime of movies and puts string into array
      st1 = tm;
      var pos = st1.indexOf(" ");

      if (pos > -1) {
        st1 = st1.substr(0, pos);
        rt_int = parseInt(st1);
      }

      incrementTotal(rt_int);

      // API call to TMDB for movie poster images
      if (quickAdd === "movie") {

        $.ajax({
          url: queryTMDB,
          method: "GET"
        })

          .then(function (responseTMDB) {
            var moviePoster = responseTMDB.results[0].poster_path
            watchedMovies.push(moviePoster);
            console.log(watchedMovies)
            localStorage.setItem("movies", JSON.stringify(watchedMovies));
            $(".first-container").prepend(`
              <img src="https://image.tmdb.org/t/p/w200${responseTMDB.results[0].poster_path}"></img>
              `)
          })
      }
// API call to TMDB for series poster images
      if (quickAdd === "series") {

        $.ajax({
          url: queryTMDB,
          method: "GET"
        })

          .then(function (responseTMDB) {
            var seriesPoster = responseTMDB.results[0].poster_path
            watchedSeries.push(seriesPoster);
            console.log(watchedSeries)
            localStorage.setItem("series", JSON.stringify(watchedSeries));
            $(".second-container").prepend(`
                <img src="https://image.tmdb.org/t/p/w200${responseTMDB.results[0].poster_path}"></img>
                `)
          })

      }
    })
});

// Ensures that when page loads the app history is all loaded onto the page
window.addEventListener("load", function(event){
  var storedMovies = JSON.parse(localStorage.getItem("movies"))
  if(storedMovies !== null){
    watchedMovies = storedMovies
  } 
  for (var i=0; i < storedMovies.length; i++){
    $(".first-container").prepend(`
    <img src="https://image.tmdb.org/t/p/w200${storedMovies[i]}"></img>
    `)
  }

  var storedSeries = JSON.parse(localStorage.getItem("series"))
  if(storedSeries !== null){
    watchedSeries = storedSeries
  } 
  for (var i=0; i < storedSeries.length; i++){
    $(".second-container").prepend(`
    <img src="https://image.tmdb.org/t/p/w200${storedSeries[i]}"></img>
    `)
  }

  var savedTime = localStorage.getItem('savedTime');
  document.getElementById("time-watched-graphic").innerHTML = savedTime;
})


