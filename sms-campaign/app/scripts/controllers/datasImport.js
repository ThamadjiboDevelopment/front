'use strict';

var app = angular.module('smsCampaignApp');


/*************************************************************
 *
 *
 *            CONTROLLERS
 *
 *
 ***************************************************************/


app.controller('datasImportCtrl', ['$scope', 'fileUploadService', function ($scope, fileUploadService) {

  console.log("Enter datasimportCtrl");

  $scope.selectedFileName = "Aucun fichier";
  $scope.canNotVisualize = true;
//	$scope.datas              = [];
//	$scope.datasLength        = 0;

  var uploadUrl = 'http://93.27.219.198:8080/import-module-web/import';

  $scope.uploadFile = function () {
    console.log("Entree fonction de upload");

    var upload = fileUploadService.uploadFileToUrl($scope.fileToUpload, uploadUrl);

    upload.then(function (result) {
      $scope.datas = result;
      console.log("Post return and datas = " + result);
      if (result) {
        $scope.datasLength = result.length;
        $scope.canNotVisualize = false;
      }
    });

  };
}]);


/*************************************************************
 *
 *
 *          SERVICES - FACTORIES
 *
 *
 ***************************************************************/

app.factory('fileUploadService', ['$http', function ($http) {

  var uploadFileToUrl = function (file, uploadUrl) {

    var fd = new FormData();
    fd.append('file', file);

    return $http.post(uploadUrl, fd, {
      transformRequest: angular.identity,
      headers: {'Content-Type': undefined}
    })
      .then(function (response) {
        var status = response.status;

        if (status == 200) {
          console.log("Operation de upload reussie ");
          console.log("Code retour : " + response.status);
          console.log("Data recuperee : " + response.data[0].name);

          return response.data;

        } else {
          console.log("Erreur lors de l'upload du fichier");
        }
        return [];


      });
  };
  return {uploadFileToUrl: uploadFileToUrl};

}]);


/*************************************************************
 *
 *
 *            DIRECTIVES
 *
 *
 ***************************************************************/


app.directive('ngFileUpload', ['$parse', function ($parse) {

  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      console.log("Entree dans la fonction de link directive");

      var getter = $parse('user.name');
      var setter = getter.assign;

      var object = {user: {'name': 'foo'}};
      var other = {address: {'name': 'locarno'}};
      var test = {};

      console.log('get :' + getter(object));
      console.log(setter(test, 'bar'));
      console.log(getter(test));
      console.log(test);

      var model = $parse(attrs.ngFileUpload);
      var modelSetter = model.assign;
      console.log("Attributs : " + attrs);

      element.bind('change', function () {
        console.log("Change !");
        scope.$apply(function () {
          console.log("Modification du fichier à uploader");
          console.log('valeur attribut : ' + attrs.ngFileUpload);
          modelSetter(scope, element[0].files[0]);
          console.log("valeur de model : " + model(scope));

          console.log("Nom du fichier à uploader : " + element[0].files[0].name);

          scope.selectedFileName = element[0].files[0].name;

        });
      });
    }
  };

}]);

app.directive('ngTest', function () {

  return {
    scope: {
      myName: '=name'
    },
    template: '<h4>Ceci est une directive : {{myName}} </h4>',
    link: function (scope, element, attrs) {
      console.log("Entree fonction link ngTest");
      console.log("attribut : " + scope.myName);
    }
  };
});
