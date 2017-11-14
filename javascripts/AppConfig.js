'use strict';

//can run own code in app.run
app.run(function (FIREBASE_CONFIG) {
  firebase.initializeApp(FIREBASE_CONFIG);
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