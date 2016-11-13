'use strict';

angular.module('smsCampaignApp')
  .controller('loginCtrl', function ($scope, $state) {
    var LOG = '[LoginCtrl] => '
    console.log(LOG + "Entered");

    $("[name='rememberCredentials']").bootstrapSwitch();
    $.fn.bootstrapSwitch.defaults.onText = 'Oui'
    $.fn.bootstrapSwitch.defaults.offText = 'Non'
    $.fn.bootstrapSwitch.defaults.onColor = 'success'
    $.fn.bootstrapSwitch.defaults.offColor = 'danger'



    $scope.signIn = function () {
      var login = $scope.login
      var password = $scope.password
      $scope.isLogged = false

      console.log(LOG + "Enter login handler");
      console.log(LOG + "Login value : " + $scope.login)
      console.log(LOG + "Password value : " + $scope.password)

      /* Then call the login endpoint
       If credentials aren't valid
       show a message error to the Sign in page
       else
       Retrieve datas from the endpoint and redirect to the homepage
       */
      var found = false;
      if (login == 'foo' && password == 'bar') {
        $scope.isLogged = true
        found = true
        console.log(LOG + 'Sign in ok')
        $state.go('home')

      } else {
        $scope.isLogged = false
        $scope.loginError = true
        console.log(LOG + 'Sign in error')
      }
      console.log(LOG + "IsLogged = " + $scope.isLogged)
      var loginResultMock = {
        'success': 'true',
        'httpCode': 200,
        'message': 'OK',
        'entity': {
          'login': 'foo',
          'password': 'bar',
          'name': 'Foo',
          'age': '25'
        }
      }
    }
  })
