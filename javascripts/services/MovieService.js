'use strict';

app.service("MovieService", function ($http, $q, FIREBASE_CONFIG) {
  const getRatedMovies = (userUid) => {
    let movies = [];
    return $q((resolve, reject) => {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/movies.json?orderBy="uid"&equalTo="${userUid}"`).then((results) => {
        let fbMovies = results.data;
        Object.keys(fbMovies).forEach((key) => {
          fbMovies[key].id = key;
          if (fbMovies[key].isWatched) {
            movies.push(fbMovies[key]);
          }
          resolve(movies);
        });
      }).catch((error) => {
        reject(error);
      });
    });
  };

  return { getRatedMovies };
});

