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
      arrow: '=',
      remember: '=',
      align: '@'
    },
    template: '<div style="text-align: {{vm.align}}"><md-progress-circular ng-if="!vm.languageIsReady" class="md-hue-2" md-diameter="10px" md-mode="indeterminate"></md-progress-circular>' +
      '<md-menu ng-if="vm.languageIsReady" class="abl-menu-lang">' +
      '<md-button class="{{currentLanguageClass}}" aria-label="Languages" ng-click="openMenuLanguage($mdMenu, $mdOpenMenu, $event)">' +
      '<span ng-if="flags" class="flags"></span><span class="name" ng-if="vm.label"><var>{{currentLanguage}}</var></span> <i ng-if="vm.arrow" class="fa fa-caret-down" aria-hidden="true"></i>' +
      '</md-button>' +
      '<md-menu-content class="language-menu" width="{{vm.width}}">' +
      '<md-menu-item class="language-item" ng-repeat="item in languages">' +
      '<md-button ng-click="setCurrentLanguage(item)"><div><var>{{item.name}}</var></div></md-button>' +
      '</md-menu-item>' +
      '</md-menu-content>' +
      '</md-menu></div>',
    controller: ['$scope', '$rootScope', '$mdMenu', '$localizeDropdown', '$log', controller],
    controllerAs: 'vm'
  };

  function controller($scope, $rootScope, $mdMenu, $localizeDropdown, $log) {
    var vm = this;
    
    vm.width = $scope.width || 3;
    vm.flags = $scope.flags || true;
    vm.label = $scope.label || true;
    vm.arrow = $scope.arrow || true;
    vm.remember = $scope.remember || true;
    vm.align = $scope.align || 'left';
    vm.languageIsReady = false;

    $log.debug('$localizeDropdown', $localizeDropdown);

    $scope.$watch(function() {
      return $localizeDropdown
    }, function(n, o) {
      if (n) {
        Localize.initialize({
          key: $localizeDropdown.localizeKey,
          rememberLanguage: vm.remember
        });
      }
    });

    Localize.getAvailableLanguages(function(err, languages) {
      if (err) return $log.debug("error", err);
      $scope.languages = languages;
      $log.debug('languages', languages, Localize.getLanguage());
      angular.forEach(languages, function(k, v) {
        if (k.code === Localize.getLanguage()) {
          $scope.currentLanguage = k.name
          $scope.currentLanguageClass = k.code
        }
      });
    });
    
    $scope.$on('set-initial-language', function(event, args){
      Localize.getAvailableLanguages(function(err, languages) {
        $scope.languages = languages;
        var selectedLanguage = languages.filter(function(language){
          return language.code === args.lang.code;
        });
        $scope.setCurrentLanguage(selectedLanguage[0]);
        vm.languageIsReady = true;
      });
    });

    $scope.setCurrentLanguage = function(lang) {
      Localize.setLanguage(lang.code);
      $scope.currentLanguage = lang.name;
      $scope.currentLanguageClass = lang.code;
      $log.debug('setCurrentLanguage', lang);
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
