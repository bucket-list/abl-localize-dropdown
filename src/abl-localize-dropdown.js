import styles from './abl-localize-dropdown.css';
angular
  .module('AblLocalizeDropdown', [])
  .provider('$localizeDropdown', [function $localizeDropdownProvider() {
    var config = {
      localizeKey: 'mykey'
    };
    return {
      setKey: function(value) {
        config.localizeKey = value;
      },
      $get: function() {
        return config;
      }
    }
  }])
  .directive('ablLocalizeDropdown', ablLocalizeDropdown);

var Localize = window.Localize;

function ablLocalizeDropdown() {
  var directive = {
    restrict: 'E',
    scope: {
      width: '@',
      flags: '=',
      label: '=',
      arrow: '='
    },
    template: '<md-menu class="abl-menu-lang">' +
      '<md-button class="{{currentLanguageClass}}" aria-label="Languages" ng-click="openMenuLanguage($mdMenu, $mdOpenMenu, $event)">' +
      '<span ng-if="flags" class="flags"></span><span class="name" ng-if="vm.label">{{currentLanguage}}</span> <i ng-if="vm.arrow" class="fa fa-caret-down" aria-hidden="true"></i>' +
      '</md-button>' +
      '<md-menu-content class="language-menu" width="{{vm.width}}">' +
      '<md-menu-item class="language-item" ng-repeat="item in languages">' +
      '<md-button ng-click="setCurrentLanguage(item)"><span><var>{{item.name}}</var></span></md-button>' +
      '</md-menu-item>' +
      '</md-menu-content>' +
      '</md-menu>',
    controller: ['$scope', '$rootScope', '$localizeDropdown', controller],
    controllerAs: 'vm'
  };

  function controller($scope, $rootScope, $mdMenu, $mdOpenMenu, $localizeDropdown) {
    var vm = this;
    vm.width = $scope.width || 3;
    vm.flags = $scope.flags || true;
    vm.label = $scope.label || true;
    vm.arrow = $scope.arrow || true;

    console.log('$localizeDropdown', $localizeDropdown);

    $scope.$watch(function() {
      return $localizeDropdown
    }, function(n, o) {
      if (n) {
        Localize.initialize({
          key: $localizeDropdown.localizeKey,
          rememberLanguage: true
        });
      }
    });

    Localize.getAvailableLanguages(function(err, languages) {
      if (err) return console.log("error", err);
      $scope.languages = languages;
      angular.forEach(languages, function(k, v) {
        if (k.code === Localize.getLanguage()) {
          $scope.currentLanguage = k.name
          $scope.currentLanguageClass = k.code
        }
      });
    });

    $scope.setCurrentLanguage = function(lang) {
      Localize.setLanguage(lang.code);
      $scope.currentLanguage = lang.name;
      $scope.currentLanguageClass = lang.code;
      $rootScope.$broadcast('language-updated', {
        lang: lang
      });
    };

    $scope.openMenuLanguage = function($mdMenu, $mdOpenMenu, event) {
      if($mdMenu){
        $mdMenu.open(event);
      }else{
        $mdOpenMenu(event);
      }
    };
  }
  return directive;
}
