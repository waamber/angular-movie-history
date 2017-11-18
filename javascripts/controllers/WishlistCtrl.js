'use strict';

app.controller("WishlistCtrl", function ($location, $rootScope, $scope, MovieService) {

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
    let updatedMovie = MovieService.createMovieObject(movie);
    MovieService.updateMovie(updatedMovie, movie.id).then((results) => {
      getMovies();
    }).catch((error) => {
      console.log("Error in switchWatched", error);
    });
  };
  $scope.movieDetail = (movieId) => {
    $location.path(`/movie/${movieId}`);
  };

});
