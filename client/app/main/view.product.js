import angular from 'angular';
import uiRouter from 'angular-ui-router';
//import routing from './main.routes';
import myservice from './products.service';

export class ProductsViewController {

  //var _id=0;
 /*@ngInject*/
  constructor($state, $stateParams,products,$http){
    console.log("hello");
    var _id=$stateParams.id;
    this.$state=$state;
    this._products=products;
    this.$http=$http;
    //console.log('/api/products/'+$stateParams.id);
    //this.product = products.get({id: $stateParams.id});
     var querystr='/api/products/'+_id;

    this.$http.get(querystr)
    .then(response => {
      console.log(response.data);
      this.product = response.data;
      if(this.product!==undefined)
      {
        this.isFound=true;//alert($stateParams.productID);
      }else {
        this.isFound=false;
      }
    });



    //console.log(id+":"+this.isFound+":"+this.product);
  }


 deleteProduct(){
   //this._products.delete(this.product);

   var querystr='/api/products/'+this.product._id;
     this.$http({method:'DELETE',url:querystr}).then(response => {

   this.$state.go('main');

 }).catch( (error,status)=>{

   this._isValid=false;
   this._errorMsg=error;

 }

 );


      this._isValid=false;
      this._errorMsg='some error occured';
     //this._products.update(this.product);
   //alert(this.product.price);
   //this.$state.go('main');

   this.$state.go('main');

 }
/*  newProduct(){


  }
  */
}

ProductsViewController.$inject=['$state','$stateParams','products','$http'];

export default angular.module('viewProductComponent', [uiRouter,'myservice'])
  //.config(routing)
  .component('viewProduct', {
    template: require('./templates/product-view.html'),
    controller: ProductsViewController//,
    //controllerAS:'VM'
  })
  .name;
