'use strict';

app.controller("MovieDetailCtrl", function ($location, $routeParams, $scope, MovieService) {
  $scope.movie = {};

  const getMovie = () => {
    MovieService.getSingleMovie($routeParams.id).then((results) => {
      $scope.movie = results.data;
    }).catch((error) => {
      console.log("Error in getSingleMovie", error);
    });
  };

  getMovie();

  $scope.switchWatched = (movie) => {
    movie.isWatched = true;
    let updatedMovie = MovieService.createMovieObject(movie);
    MovieService.updateMovie(updatedMovie, $routeParams.id).then((results) => {
      getMovie();
    }).catch((error) => {
      console.log("Error in switchWatched", error);
    });
  };
  $scope.movieDetail = (movieId) => {
    $location.path(`/movie/${movieId}`);
  };

  $scope.starChange = (event, movie) => {
    if (event.rating) {
      movie.rating = event.rating;
      let updatedMovie = MovieService.createMovieObject(movie);
      MovieService.updateMovie(updatedMovie, $routeParams.id).then(() => {
        getMovie();
      }).catch((error) => {
        console.log("Error in starChange", error);
      });
    }
  };

});