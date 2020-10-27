//Api call OMDB, IMDB
//TMDB  (images)
var queryTmdb = "https://api.themoviedb.org/3/movie/{movie_id}/images?api_key=77cf51e8d01e26a06a5030f3b856fe9e&language=en-US"
//OMDB API
var queryOmdb = "https://www.omdbapi.com/?t=" + movie + "&apikey=10e7754b";;

// Perfoming an AJAX GET request to our queryURL
$.ajax({
  url: queryTmdb,
  method: "GET"
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
