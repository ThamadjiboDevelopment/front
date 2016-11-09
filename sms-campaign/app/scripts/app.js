'use strict';

/**
 * @ngdoc overview
 * @name smsCampaignApp
 * @description
 * # smsCampaignApp
 *
 * Main module of the application.
 */

angular
  .module('smsCampaignApp', ['ui.router'])
  .config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'views/home.html',
        controller: 'homeCtrl'
      })


      /**
       * IMPORT
       */
      .state('import', {
        url: '/import',
        templateUrl: 'views/datasImport.html',
        controller: 'datasImportCtrl'
      })

      .state('import.visualize', {
        url: '/visualize',
        templateUrl: 'views/datas-visualize.html',
        controller: 'datasImportCtrl'
      })

      /**
       * CAMPAIGNS
       */
      .state('campaigns', {
        abstract: 'true',
        url: '/campaigns',
        templateUrl: 'views/campaigns.html'
        //        controller: 'campaignsCtrl'
      })

      .state('campaigns.add', {
        url: '/add',
        templateUrl: 'views/campaigns-add.html',
        controller: 'campaignsCtrl'
      })

      /**
       * LOGIN
       */
      .state('login', {
        url: '/signIn',
        templateUrl: 'views/login.html',
        controller: 'loginCtrl'
      })

      /**
       * USERS
       */
      .state('users', {
        abstract: 'true',
        url: '/users',
        templateUrl: 'views/users.html'
      })
      .state('users.search', {
        url: '/search',
        templateUrl: 'views/users-search.html',
        controller: 'usersCtrl'
      })
      .state('users.add', {
        url: '/add',
        templateUrl: 'views/users-add.html',
        controller: 'usersCtrl'
      })
      .state('users.list', {
        url: '/list',
        templateUrl: 'views/users-list.html',
        controller: 'usersListCtrl',
        params: {
          users: {
            value: ['default'],
            array: true
          }
        }
      })
      .state('users.details', {
        url: '/details',
        templateUrl: 'views/users-details.html',
        controller: 'usersCtrl'
      })
      .state('users.edit', {
        url: '/edit',
        templateUrl: 'views/users-edit',
        controller: 'usersCtrl'
      })
  });

var app = angular.module('smsCampaignApp');

app.factory('usersMockFactory', function () {
  var users = [
    {
      'login': 'foo',
      'password': 'foopass',
      'name': 'M.Foo',
      'age': '25'
    },
    {
      'login': 'bar@live.fr',
      'password': 'barpass',
      'name': 'M.Bar',
      'age': '35'
    },
    {
      'login': 'malika',
      'password': 'cassepied',
      'name': 'Mlle fofolle',
      'age': '45'
    }
  ]

  return {
    getAllUsers: users
  }

})



