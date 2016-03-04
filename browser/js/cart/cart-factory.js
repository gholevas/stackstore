app.factory('CartFactory', function ($http) {

    var getUserCart = function () {
        return $http.get('/api/cart/user').then(function (response) {
            return response.data;
        });
    };

    var getAll = function () {
    	return $http.get('/api/cart/').then(function (response) {
            return response.data;
        }); 
    }

    var updateCart = function (cart) {
        console.log(cart)
        return $http.put('/api/cart/user',cart).then(function (response) {
            return response.data
        })
    }

    return {
        getUserCart: getUserCart,
        getAll: getAll,
        updateCart: updateCart
    };

});