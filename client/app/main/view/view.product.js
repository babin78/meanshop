import angular from 'angular';
import uiRouter from 'angular-ui-router';
//import routing from './main.routes';
import myservice from '../products.service';

export class ProductsViewController {

 /*@ngInject*/
  constructor( $stateParams,products){
    this.product = products.get({id: $stateParams.id});
  }

/*  newProduct(){


  }
  */
}

ProductsViewController.$inject=[  $stateParams,'products'];

export default angular.module('viewProductComponent', [uiRouter,'myservice'])
  //.config(routing)
  .component('viewProduct', {
    template: require('../../products/templates/product-view.html'),
    controller: ProductsViewController
    controllerAS:'VM'
  })
  .name;
