'use strict';

app.controller("WishlistCtrl", function ($rootScope, $scope, MovieService) {
  MovieService.getWishListMovies($rootScope.uid).then((results) => {
    $scope.movies = results;
  }).catch((error) => {
    console.log("Error in MovieService", error);
  });
});
