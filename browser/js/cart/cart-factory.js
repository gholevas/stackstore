app.factory('CartFactory', function ($http) {

    var getUserCart = function () {
        return $http.get('/api/cart/user').then(function (response) {
            return response.data;
        });
    };

    return {
        getUserCart: getUserCart
    };

});