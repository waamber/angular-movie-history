'use strict';

let isAuth = (AuthService) => new Promise((resolve, reject) => {
  if (AuthService.isAuthenticated()) {
    resolve();
  } else {
    reject();
  }
});

//can run own code in app.run
app.run(function ($location, $rootScope, AuthService, FIREBASE_CONFIG, tmdbService) {
  firebase.initializeApp(FIREBASE_CONFIG);

  tmdbService.tmdbConfiguration().then((result) => {
    $rootScope.image_url = result.data.images.base_url;
  }).catch((error) => {
    console.log("Error in tmdb app.run", error);
  });
  //watch method that fires on change of a route.  3 inputs. 
  //event is a change event
  //currRoute is information about your current route
  //prevRoute is information about the route you came from
  $rootScope.$on('$routeChangeStart', function (event, currRoute, prevRoute) {
    // checks to see if there is a current user
    const logged = AuthService.isAuthenticated();
    let appTo;
    // to keep error from being thrown on page refresh
    if (currRoute.originalPath) {
      // check if the user is going to the auth page = currRoute.originalPath
      // if user is on auth page then appTo is true
      // if it finds something other than /auth it return a -1 and -1!==-1 so resolves to false
      appTo = currRoute.originalPath.indexOf('/auth') !== -1;
    }
    //if not on /auth page AND not logged in redirect to /auth
    if (!appTo && !logged) {
      event.preventDefault();
      $location.path('/auth');
    }
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
      controller: 'WishlistCtrl',
      resolve: { isAuth }
    })
    .when("/rated", {
      templateUrl: 'partials/rated.html',
      controller: 'RatedCtrl',
      resolve: { isAuth }
    })
    .when("/movie/:id", {
      templateUrl: 'partials/movie_detail.html',
      controller: 'MovieDetailCtrl',
      resolve: { isAuth }
    })
    .when("/search", {
      templateUrl: 'partials/search.html',
      controller: 'SearchCtrl',
      resolve: { isAuth }
    })
    .otherwise("/auth");
});