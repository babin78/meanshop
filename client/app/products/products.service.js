'use strict';
const angular = require('angular');

/*@ngInject*/
export function productsService($http) {
   this.$http
  var last_id = 5;
    var example_products = [
      {_id: 1, title: 'Product 1', price: 123.45, quantity: 10, description: 'Lorem ipsum dolor sit amet'},
      {_id: 2, title: 'Product 2', price: 123.45, quantity: 10, description: 'Lorem ipsum dolor sit amet'},
      {_id: 3, title: 'Product 3', price: 123.45, quantity: 10, description: 'Lorem ipsum dolor sit amet'},
      {_id: 4, title: 'Product 4', price: 123.45, quantity: 10, description: 'Lorem ipsum dolor sit amet'},
      {_id: 5, title: 'Product 5', price: 123.45, quantity: 10, description: 'Lorem ipsum dolor sit amet'}
    ];
    var products=[];

    return {
      query: function(){
        //return example_products;
        this.$http.get('/api/products')
          .then(response => {
            this.products = response.data;

          });
          return this.products;

      },

      get: function(product){
        var result = {};

        this.$http({
                    method : 'GET',
                    url : '/api/products/'+params.id
            }).then(response => {
              result=response.data;


            });
          return result;

      /*
        angular.forEach(products, function (product) {
          if(product._id == params.id)
            return this.product = product;
        }, result);
        return result.product;
        */
      },

      delete: function(params){
        /*angular.forEach(example_products, function (product, index) {
          if(product._id == params._id){
            console.log(product, index);
            example_products.splice(index, 1);
            return;
          }
        });
        */

        this.$http({
                    method : 'DELETE',
                    url : '/api/products/'+params.id
            }).then(response => {
              return;

            });

      },

      create: function(product){
        var result = {};

        this.$http({
                    method : 'POST',
                    url : '/api/products/',
                    data:product
            }).then(response => {
              result=response.data;


            });
          return result;

      },

      update: function(product){
        var item = this.get(product);
        if(!item) return false;

        item.title = product.title;
        item.price = product.price;
        item.quantity = product.quantity;
        item.description = product.description;
        return true;
      }
    };
}


export default angular.module('myservice', [])
  .factory('products', productsService)
  .name;
