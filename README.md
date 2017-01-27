# abl-localize-dropdown
ABL Module for language

##Installation:

###Bower and NPM
```"abl-localize-dropdown": "https://github.com/bucket-list/abl-localize-dropdown"```

###Include CSS:
```<link rel="stylesheet" href="node_modules/abl-localize-dropdown/abl-localize-dropdown.css" type="text/css" />```

###Include JS:
```<script src="https://global.localizecdn.com/localize.js"></script>```
```<script src="node_modules/abl-localize-dropdown/abl-localize-dropdown.js"></script>```

###Config module:
```.config(['localizeDropdownProvider', function(localizeDropdownProvider) {
  localizeDropdownProvider.setKey('yourkey');
}]);```

###Use:
```<abl-localize-dropdown width="3" flags="true"></abl-localize-dropdown>```
