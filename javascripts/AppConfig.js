'use strict';

//can run own code in app.run
app.run(function ($rootScope, FIREBASE_CONFIG, tmdbService) {
  firebase.initializeApp(FIREBASE_CONFIG);
  tmdbService.tmdbConfiguration().then((result) => {
    $rootScope.image_url = result.data.images.base_url;
  }).catch((error) => {
    console.log("Error in tmdb app.run", error);
  });
});

//cannot run own code in app.config
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