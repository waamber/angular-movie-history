'use strict';


app.controller("SearchCtrl", function ($scope, tmdbService) {

  $scope.enterPush = (event) => {
    if (event.keyCode === 13) {
      tmdbService.searchMovies(event.target.value).then((results) => {
        console.log("Search results", results.data.results);
      }).catch((error) => {
        console.log("Error in SearchCtrl", error);
      });
    }
  };
});