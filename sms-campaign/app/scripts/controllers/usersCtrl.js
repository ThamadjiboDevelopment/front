'use strict';
var app = angular.module('smsCampaignApp');
/*app.factory('usersMockFactory', function () {
 var users = [
 {
 'login': 'foo',
 'password': 'bar',
 'name': 'Foo',
 'age': '25'
 },
 {
 'login': 'a',
 'password': 'b',
 'name': 'ab',
 'age': '15'
 }
 ]

 this.getAllUsers = function () {
 return users
 }
 return users
 })*/


app.controller('usersSearchCtrl', function ($scope, $state, usersMockFactory) {
    var LOG = '[usersCtrl] => '

    $scope.login = ''
    console.log(LOG + 'Entered')
    console.log(LOG + 'User login from mock factory : ' + usersMockFactory.getAllUsers)

    /**
     * SEARCH USER
     */

    $scope.searchUser = function () {
      console.log(LOG + 'Search function')
      console.log(LOG + 'Searching for user with login :'+$scope.login)
      var users = usersMockFactory.getAllUsers
      $scope.emptyUsers = false

      if ($scope.login == '') {
        $state.go('users.list', {
          users: users
        })
      } else {
        var found = false
        for (var i in users) {
          console.log(LOG+'Comparison : '+users[i].login + ' and '+$scope.login)
          if (users[i].login == $scope.login) {
            console.log(LOG+ 'Found user with login :'+$scope.login)
            found = true
            $state.go('users.list', {
              users: users[i]
            })
            break;
          }
        }
        if(found == false){
          console.log(LOG+ 'Uuser not found, boolean found = '+found)
          $scope.emptyUsers = true
          $state.go('users.list', {
            users: []
          })
        }
      }
    }
  })

/**
 *
 * LIST USERS
 *
 * */
app.controller('usersListCtrl', function($scope, $stateParams) {
  var LOG = '[usersListCtrl] => '
  console.log(LOG + 'Entered')
  $scope.emptyUsers = false
  var users = $stateParams.users
  if(users && users.length == 0){
    $scope.emptyUsers = true
  }

  for(var i in users){
    console.log(LOG+ 'result'+users[i].login)
    $scope.receivedLogin = users[i].login
  }
  $scope.receivedUsers = users

})

app.controller('userDetailsCtrl', function($scope, $stateParams){
  var LOG = '[userDetailsCtrl] => '
  console.log(LOG + 'Entered')

  $scope.userDetails = $stateParams.user;

})

app.controller('usersAddCtrl', function($scope){
  var LOG = '[usersAddCtrl] => '
  console.log(LOG + 'Entered')

  $scope.addUser = function(){
    var userView = {
      login: $scope.login,
      name: $scope.name,
      password: $scope.password,
      confirmPassword: $scope.confirmPassword,
      telNumber: $scope.telNumber,
      birthDate: $scope.birthDate
    }

    if(userView.password != userView.confirmPassword){
      throw 'Le mot de passe et la confirmation du mot de passe doivent être identiques'
    }

    /* TODO: Call the service to persist user in database */
  }
})
