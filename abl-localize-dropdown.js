(function(window, angular) {
    'use strict';
    var AblLocalizeDropdownModule =
        angular.module('AblLocalizeDropdown', [])
        .provider('localizeDropdown', LocalizeDropdownProvider);

    function LocalizeDropdownProvider() {
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
    }

    AblLocalizeDropdownModule.directive('ablLocalizeDropdown', ablLocalizeDropdown);
    function ablLocalizeDropdown() {
        var directive = {
            restrict: 'E',
          scope: {
                width:'@',
                flags:'='
            },
            template: '<script>!function(a){if(!a.Localize){a.Localize={};for(var e=["translate","untranslate","phrase","initialize","translatePage","setLanguage","getLanguage","detectLanguage","getAvailableLanguages","untranslatePage","bootstrap","prefetch","on","off"],t=0;t<e.length;t++)a.Localize[e[t]]=function(){}}}(window);</script>' +
                '<md-menu class="abl-menu-lang">' +
                '<md-button class="{{currentLanguageClass}}" aria-label="Languages" ng-click="$mdOpenMenu($event)">' +
                '<span ng-if="flags" class="flags"></span><span class="name">{{currentLanguage}}</span>' +
                '</md-button>' +
                '<md-menu-content class="language-menu" width="{{width}}">' +
                '<md-menu-item class="language-item" ng-repeat="item in languages">' +
                '<md-button ng-click="setCurrentLanguage(item)">{{item.name}}</md-button>' +
                '</md-menu-item>' +
                '</md-menu-content>' +
                '</md-menu>',
            controller: controller
        };

        function controller($scope, $rootScope, localizeDropdown) {
            Localize.initialize({
                key: localizeDropdown.localizeKey,
                rememberLanguage: true
            });
            Localize.getAvailableLanguages(function(err, languages) {
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
                $rootScope.$broadcast('language-updated', {lang:lang});
            }
        }
        return directive;
    }

})(window, window.angular);
