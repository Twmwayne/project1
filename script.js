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
  return rhours.toString() + " hour(s) and " + rminutes.toString() + " minute(s).";
}

function incrementTotal(inp_time){
  var totalStr;

  timeTotal += inp_time;
  totalStr = timeConvert(timeTotal);
  
  localStorage.setItem("savedTime", totalStr)
  var storedTime = localStorage.getItem("savedTime");
  document.getElementById("time-watched-graphic").innerHTML = storedTime;
}

searchButton.addEventListener("click", function (event) {
  event.preventDefault();
  movieAdd = searchInput.value.trim();
  var queryOMDB = "https://www.omdbapi.com/?t=" + movieAdd + "&apikey=10e7754b";
  var queryTMDB = "https://api.themoviedb.org/3/search/multi?api_key=" + apiKey + "&language=en-US&query=" + movieAdd + "&include_adult=false"

  // Perfoming an AJAX GET request to our queryURL
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

      st1 = tm;
      var pos = st1.indexOf(" ");

      if (pos > -1) {
        st1 = st1.substr(0, pos);
        rt_int = parseInt(st1);
      }

      incrementTotal(rt_int);

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

//Array for next ten list (with movie posters, use bootstrap carousel)
// $('.carousel').carousel({
//   interval: 2000
// })
//Dashboard list

//IMDB top 100
//Rotten tomatoes (OMDB)
//Longest queued. Function to grab the oldest entries in local storage
//Kid friendly. IMDB kids movie list
