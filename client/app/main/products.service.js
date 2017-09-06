'use strict';
const angular = require('angular');

/*@ngInject*/
export function productsService($http) {
  var last_id = 5;

    var example_products = [
      {_id: 1, title: 'Product 1', price: 123.45, quantity: 10, description: 'Lorem ipsum dolor sit amet'},
      {_id: 2, title: 'Product 2', price: 123.45, quantity: 10, description: 'Lorem ipsum dolor sit amet'},
      {_id: 3, title: 'Product 3', price: 123.45, quantity: 10, description: 'Lorem ipsum dolor sit amet'},
      {_id: 4, title: 'Product 4', price: 123.45, quantity: 10, description: 'Lorem ipsum dolor sit amet'},
      {_id: 5, title: 'Product 5', price: 123.45, quantity: 10, description: 'Lorem ipsum dolor sit amet'}
    ];



    //var example_products=[];

    return {
      query: function(){
        //return example_products;

        $http.get('/api/products').then(response=>{
          //console.log(response.data);
          //this.example_products=JSON.parse(response.data);
          example_products=response.data;
          //return response.data;
        });

        return example_products;
      },

      get: function(params){
        var result = {};
        angular.forEach(example_products, function (product) {
          if(product._id == params.id)
            return this.product = product;
        }, result);
        return result.product;

        //return {_id: 1, title: 'Product 1', price: 123.45, quantity: 10, description: 'Lorem ipsum dolor sit amet'};
      },

      delete: function(params){
        angular.forEach(example_products, function (product, index) {
          if(product._id == params._id){
            console.log(product, index);
            example_products.splice(index, 1);
            return;
          }
        });
      },

      create: function(product){
        product._id = ++last_id;
         //alert(product.id);
        example_products.push(product);
      },

      update: function(product){
        var item = this.get(product);
        if(!item) return false;

        item.title = product.title;
        item.price = product.price;
        item.quantity = product.quantity;
        item.description = product.description;
        return true
      }
    };
}


export default angular.module('myservice', [])
  .factory('products', productsService)
  .name;
