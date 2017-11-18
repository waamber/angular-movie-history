'use strict';

app.controller("SearchCtrl", function ($location, $rootScope, $scope, MovieService, tmdbService) {
  $scope.movies = [];

  $scope.enterPush = (event) => {
    if (event.keyCode === 13) {
      tmdbService.searchMovies(event.target.value).then((results) => {
        $scope.movies = results.data.results;
      }).catch((error) => {
        console.log("Error in SearchCtrl", error);
      });
    }
  };

  $scope.savedRated = (tmdbMovie) => {
    tmdbMovie.uid = $rootScope.uid;
    tmdbMovie.isWatched = true;
    tmdbMovie.rated = 0;
    let newMovie = MovieService.createMovieObject(tmdbMovie);
    MovieService.postNewMovie(newMovie).then(() => {
      $location.path('/rated');
    }).catch((error) => {
      console.log("Error in savedRated", error);
    });
  };

  $scope.saveWishlist = (tmdbMovie) => {
    tmdbMovie.uid = $rootScope.uid;
    tmdbMovie.isWatched = false;
    tmdbMovie.rated = 0;
    let newMovie = MovieService.createMovieObject(tmdbMovie);
    MovieService.postNewMovie(newMovie).then(() => {
      $location.path('/wishlist');
    }).catch((error) => {
      console.log("Error in savedRated", error);
    });
  };

});