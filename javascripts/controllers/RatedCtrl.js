'use strict';

app.controller("RatedCtrl", function ($rootScope, $scope, MovieService) {
  $scope.movies = [];

  const getMovies = () => {
    MovieService.getRatedMovies($rootScope.uid).then((results) => {
      $scope.movies = results;
    }).catch((error) => {
      console.log("Error in MovieService", error);
    });
  };

  getMovies();

  $scope.deleteMovie = (movieId) => {
    MovieService.deleteMovie(movieId).then((result) => {
      getMovies(); //page and movies reload after delete
    }).catch((error) => {
      console.log("Error in deleteMovie", error);
    });
  };

  $scope.starChange = (event, movie) => {
    if (event.rating) {
      movie.rating = event.rating;
      let updatedMovie = MovieService.createMovieObject(movie);
      MovieService.updateMovie(updatedMovie, movie.id).then(() => {
        getMovies();
      }).catch((error) => {
        console.log("Error in starChange", error);
      });
    }
  };

});