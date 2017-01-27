# abl-localize-dropdown
ABL Module for language

##Installation:

###Include CSS:
```<link rel="stylesheet" href="node_modules/abl-localize-dropdown/abl-localize-dropdown.css" type="text/css" />```

###Include JS:
```<script src="https://global.localizecdn.com/localize.js"></script>
<script src="node_modules/abl-localize-dropdown/abl-localize-dropdown.js"></script>```

###Config module:
```.config(['localizeDropdownProvider', function(localizeDropdownProvider) {
//key for tahiti marketplace	
localizeDropdownProvider.setKey('yourkey');
}]);```

###Use:
```<abl-localize-dropdown width="3" flags="true"></abl-localize-dropdown>```
