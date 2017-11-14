'use strict';

app.controller("AuthCtrl", function ($location, $rootScope, $scope, AuthService) { //ang variables THEN my variables, alphabetical
  $scope.authenticate = () => {
    AuthService.authenticateGoogle().then((result) => {
      // console.log('Auth result', result.user.uid);
      $rootScope.uid = result.user.uid; //rootScope is global variable
      $scope.$apply(() => {
        $location.url('/search');
      });
    }).catch((error) => {
      console.log('Error in auth', error);
    });
  };
});