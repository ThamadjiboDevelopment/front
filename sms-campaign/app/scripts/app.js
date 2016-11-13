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
        templateUrl: 'views/import/import-data.html',
        controller: 'datasImportCtrl'
      })

      .state('import.visualize', {
        url: '/visualize',
        templateUrl: 'views/import/visualize-import.html',
        controller: 'datasImportCtrl'
      })

      /**
       * CAMPAIGNS
       */
      .state('campaigns', {
        abstract: 'true',
        url: '/campaigns',
        templateUrl: 'views/campaigns/campaigns.html'
        //        controller: 'campaignsCtrl'
      })

      .state('campaigns.add', {
        url: '/add',
        templateUrl: 'views/campaigns/campaigns-add.html',
        controller: 'campaignsCtrl'
      })

      .state('campaigns.search', {
        url: '/search',
        templateUrl: 'views/campaigns/campaigns-search.html',
        controller: 'campaignsCtrl'
      })

      /**
       * LOGIN
       */
      .state('sign-in', {
        url: '/sign-in',
        templateUrl: 'views/login.html',
        controller: 'loginCtrl'
      })

      /**
       * USERS
       */
      .state('users', {
        abstract: 'true',
        url: '/users',
        templateUrl: 'views/users/users.html'
      })
      .state('users.search', {
        url: '/search',
        templateUrl: 'views/users/users-search.html',
        controller: 'usersSearchCtrl'
      })
      .state('users.add', {
        url: '/add',
        templateUrl: 'views/users/users-add.html',
        controller: 'usersAddCtrl'
      })
      .state('users.list', {
        url: '/list',
        templateUrl: 'views/users/users-list.html',
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
        templateUrl: 'views/users/users-details.html',
        controller: 'userDetailsCtrl',
        params: {
          user: {
            value: {}
          }
        }
      })

      .state('users.edit', {
        url: '/edit',
        templateUrl: 'views/users/users-edit',
        controller: 'usersEditCtrl'
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
    }
  ]

  return {
    getAllUsers: users
  }

})



