/* global angular */
angular
    .module('AblLocalizeDropdown', [])
    .directive('ablLocalizeDropdown', ablLocalizeDropdown);

var Localize = window.Localize;

function ablLocalizeDropdown() {
    var directive = {
        restrict: 'E',
        scope: {
            width: '@',
            flags: '='
        },
        template: '<md-menu class="abl-menu-lang">' +
            '<md-button class="{{currentLanguageClass}}" aria-label="Languages" ng-click="$mdOpenMenu($event)">' +
            '<span ng-if="flags" class="flags"></span><span class="name">{{currentLanguage}}</span>' +
            '</md-button>' +
            '<md-menu-content class="language-menu" width="{{width}}">' +
            '<md-menu-item class="language-item" ng-repeat="item in languages">' +
            '<md-button ng-click="setCurrentLanguage(item)">{{item.name}}</md-button>' +
            '</md-menu-item>' +
            '</md-menu-content>' +
            '</md-menu>',
        controller: [ '$scope', '$rootScope', controller ]
    };

    function controller($scope, $rootScope) {
        Localize.getAvailableLanguages(function(err, languages) {
            if (err) return console.log ("error", err);
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
        }
    }
    return directive;
}
