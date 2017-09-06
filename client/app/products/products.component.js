'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');


import routes from './products.routes';
import myservice from './products.service';
export class ProductsComponent {

  //var products={};
  /*@ngInject*/
  constructor(products,$http) {
    this.$http=$http;

    this.$http.get('/api/products')
      .then(response => {
        console.log(response.data);
        this.products = response.data;

      });
    //this.message = 'Hello';
  //  this.products=products.getProducts();
   //this.products = products.query();
    //this.meaningOfLife='abc';
  }

}
ProductsComponent.$inject = ['products','$http'];

//ProductsComponent.$inject=[productService];

export default angular.module('meanshopApp.products', [uiRouter,'myservice'])
  .config(routes)
  //.service('productsService',productsService)
  //.controller('ProductsComponent',['productsService',ProductsComponent])
  .component('products', {
    template: require('./products.html'),
    controller: ProductsComponent,
    controllerAs: 'productsCtrl'
  })
  .name;
