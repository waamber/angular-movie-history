'use strict';

app.controller("WishlistCtrl", function ($rootScope, $scope, MovieService) {

  const getMovies = () => {
    MovieService.getWishListMovies($rootScope.uid).then((results) => {
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

  $scope.switchWatched = (movie) => {
    movie.isWatched = true;
    let newMovie = MovieService.createMovieObject(movie);
    MovieService.updateMovie(newMovie, movie.id).then((results) => {
      console.log(results);
    }).catch((error) => {
      console.log("Error in switchWatched", error);
    });
  };
});
