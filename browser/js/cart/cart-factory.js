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

    var processOrder = function (data) {
        return $http.post('/api/cart/purchase',data).then(function(response) {
            return response.data
        },console.log)
    }

    var addToCart = function (product,quantity) {
        return $http.put('/api/cart/add-to-cart',{product:product, quantity:quantity}).then(function (response) {
            return response.data;
        })
    }

    var removeProduct = function (product) {
        return $http.put('/api/cart/remove-product',product).then(function (response) {
            return response.data
        })
    }

    return {
        getUserCart: getUserCart,
        getAll: getAll,
        updateCart: updateCart,
        processOrder: processOrder,
        addToCart: addToCart,
        removeProduct: removeProduct
    };

});