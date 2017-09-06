import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';
import myservice from './products.service';
import viewProductComponent from './view.product';
import newProductComponent from './new.product';
import editProductComponent from './edit.product';
export class ProductsCtrlController {


 /*@ngInject*/
  constructor($state,$stateParams,products,$http){

    this.$state=$state;
    this.$http=$http;
    //this._products=products;
    //this.products = this._products.query();
    //console.log(this.products);


    var id=$stateParams.productID;



  }

  $onInit(){


      this.$http.get('/api/products')
      .then(response => {
        //console.log(response.data);
        this.products = response.data;

      });

      /*
      this.product = this.products.get({id: $stateParams.productID});
      if(this.product!==undefined)
      {
        this.isFound=true;//alert($stateParams.productID);
      }else {
        this.isFound=false;
      }
      */

  }
  newProduct()
  {
    this.$state.go('newProduct');
  }


}

ProductsCtrlController.$inject=['$state','$stateParams','products','$http'];

export default angular.module('meanshopApp.main', [uiRouter,'myservice',viewProductComponent,newProductComponent,editProductComponent])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: ProductsCtrlController
  })
  .name;
