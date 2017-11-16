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

  const createMovie = (movie) => {
    return {
      "title": movie.title,
      "overview": movie.overview,
      "poster_path": movie.poster_path,
      "rating": 0,
      "isWatched": true,
      "uid": $rootScope.uid
    };
  };

  $scope.savedRated = (tmdbMovie) => {
    let newMovie = createMovie(tmdbMovie);
    MovieService.postNewMovie(newMovie).then(() => {
      $location.path('/rated');
    }).catch((error) => {
      console.log("Error in savedRated", error);
    });
  };

  $scope.saveWishlist = (tmdbMovie) => {
    let newMovie = createMovie(tmdbMovie);
    newMovie.isWatched = false;
    MovieService.postNewMovie(newMovie).then(() => {
      $location.path('/wishlist');
    }).catch((error) => {
      console.log("Error in savedRated", error);
    });
  };
});