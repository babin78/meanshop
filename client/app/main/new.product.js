import angular from 'angular';
import uiRouter from 'angular-ui-router';
//import routing from './main.routes';
import myservice from './products.service';

export class ProductsNewController {

 /*@ngInject*/
  constructor($state, $stateParams,products,$http){
    //alert('hi');
    this.$state=$state;
    this._products=products;
    this.$http=$http;
  }
  addProduct(){
   //alert('hi');
    //alert(this.title);
    //this._products.create(this.product);
    this.$http.post('/api/products',this.product).then(response=>{
        this.$state.go('main');
    }).catch(response=>{
        console.log(response);
    });



  }

  upload(file){
    alert('hi');
  }

}

ProductsNewController.$inject=['$state','$stateParams','products','$http'];

export default angular.module('newProductComponent', [uiRouter,'myservice'])
  //.config(routing)
  /*.config(function($stateProvider) {
    'ngInject';
    $stateProvider.state('main', {
      url: '/main',
      template: '<main></main>'
    });

  })
  */
  .component('newProduct', {
    template: require('./templates/product-new.html'),
    controller: ProductsNewController//,
    //controllerAS:'VM'
  })
  .name;
