var searchButton = document.querySelector("#search-button");
var searchInput = document.querySelector("#search-input");
var unwatchedMovie = document.querySelector("#movies");
var apiKey = "77cf51e8d01e26a06a5030f3b856fe9e"

//global variables to make arrays from movies chosen
var cntr = 0
var names = new Array();
var runtimes = new Array();
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

function addToWatched(index) {
  var title = names[index];
  console.log(title);

  if (runningTotal.indexOf(title) == -1) {
    var tm = runtimes[index];
    console.log(tm);
    // var movieDiv = $("<div class='movie'>");
    var totalStr;

    // $("#movies").prepend(movieDiv);
    runningTotal.push(title);
    timeTotal += tm;
    totalStr = timeConvert(timeTotal);
    document.getElementById("time-watched-graphic").innerHTML = totalStr;
    console.log(totalStr);
    cntr++;
  }
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
            var st1 = tm;
            var rt_int = 0;
    
            var pos = st1.indexOf(" ");
            if (pos > -1) {
              st1 = st1.substr(0, pos);
              rt_int = st1;
            }
      if (quickAdd === "movie") {
 
        $.ajax({
          url: queryTMDB,
          method: "GET"
        })

          .then(function (responseTMDB) {
            $(".first-container").prepend(`
              <img src="https://image.tmdb.org/t/p/w200${responseTMDB.results[0].poster_path}"></img>
              `)
          })
          // runtimes.push(rt_int);
          // addToWatched(cntr);

      }

      if (quickAdd === "series") {

          $.ajax({
            url: queryTMDB,
            method: "GET"
          })
  
            .then(function (responseTMDB) {
              $(".second-container").prepend(`
                <img src="https://image.tmdb.org/t/p/w200${responseTMDB.results[0].poster_path}"></img>
                `)
            })
 
      }

      runtimes.push(rt_int);
          console.log(rt_int);
         addToWatched(cntr);
    })
});


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
