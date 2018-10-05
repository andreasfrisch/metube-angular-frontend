angular.module('localization', [])
.service('localizationService', ['$http', function($http) {
    var localizationService = this;
    this.keyValueStore = {
        'pony': 'fluttershy'
    }
    return {
        lookupKey: function(key) {
            return localizationService.keyValueStore[key];
        },
        fetchLanguageStore: function(language) {
            $http.get('someserver/api/languagefiles/'+language).then(
                function(responseStore) {
                    localizationService.keyValueStore = responseStore;
                }
            )
        }
    }
})
.filter('i18n', ['localizationService', function(localizationService) {
    return function(key) {
        return localizationService.lookupKey(key);
    }
}])