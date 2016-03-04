app.config(function($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html'
        // resolve: {
        // 	// stores: function (StoreFactory) {
        // 	// 	return StoreFactory.getAll()
        // 	// }
        // }
    });
});


