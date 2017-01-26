(function(window, angular) {'use strict';
    var AblLocalizeDropdownModule = angular.module('AblLocalizeDropdown', [])
        .provider('$localizeDropdown', $LocalizeDropdownProvider);
    
    function $LocalizeDropdownProvider(){
        var config = {localizeKey:'mykey'};
    }
                            
    /*this.config = function(newConfig) {
        config = angular.extend(config, newConfig);
    };*/
                            
    function watchExpr(attrName, ariaAttr, nodeBlackList, negate) {
        return function(scope, elem, attr) { };
    }
                            
    this.$get = function() {
        return {
            config: function(key) {
            return config[key];
        },
        $$watchExpr: watchExpr
        };
    };
    
    AblLocalizeDropdownModule
        .controller('AblLocalizeDropdownController', AblLocalizeDropdownController)
        .directive('ablLocalizeDropdownInit', ablLocalizeDropdownInit);
    
    function AblLocalizeDropdownController($scope){
        console.log("AblLocalizeDropdownController", $scope);
        !function(a){if(!a.Localize){a.Localize={};for(var e=["translate","untranslate","phrase","initialize","translatePage","setLanguage","getLanguage","detectLanguage","untranslatePage","bootstrap","prefetch","on","off"],t=0;t<e.length;t++)a.Localize[e[t]]=function(){}}}(window);
        Localize.initialize({key:"jb9Uvr8ct9xgK",rememberLanguage:true});
    }
                            
    function ablLocalizeDropdownInit(){
        var directive = {
            restrict: 'E',
            scope: {},
            templateUrl: 'template-url.html',
            link: link,
            controller: controller
        };
        function link(scope, element, attrs){
            console.log("ablLocalizeDropdownInit:link", scope, element, attrs);
        }
        function controller($scope){
            console.log("ablLocalizeDropdownInit:controller", $scope);
        }
        return directive;
    }
    
})(window, window.angular);