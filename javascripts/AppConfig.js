'use strict';

app.config(function ($routeProvider) {
  $routeProvider
    .when("/auth", {
      templateUrl: 'partials/auth.html',
      controller: 'AuthCtrl'
    })
    .when("/wishlist", {
      templateUrl: 'partials/wishlist.html',
      controller: 'WishlistCtrl'
    })
    .when("/rated", {
      templateUrl: 'partials/rated.html',
      controller: 'RatedCtrl'
    })
    .when("/search", {
      templateUrl: 'partials/search.html',
      controller: 'SearchCtrl'
    })
    .otherwise("/auth");
});