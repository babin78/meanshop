import angular from 'angular';
import uiRouter from 'angular-ui-router';
//import routing from './main.routes';
import myservice from './products.service';
//import {RequestOptions, Request, RequestMethod} from '@angular/http';

export class ProductsEditController {
   product={};
   _id=0;
   _isValid=true;
   _errorMsg='';
   Upload;
   $timeout;
   files=null;
   $http;
   imageUrls;
 /*@ngInject*/
  constructor($state, $stateParams,products,$http,$timeout,Upload){
    //alert('hi');
    this.$state=$state;
    this._id=$stateParams.id;
    this._products=products;
    this.$http=$http;
    this._isValid=true;
    this.Upload=Upload;
    this.$timeout=$timeout;
    //this.RequestOptions=RequestOptions;
  }

  $onInit() {
    //alert(this._id);
    //this.product = this._products.get({id: this._id});
    //console.log(JSON.stringify( this.product));
   this._isValid=true;
    var querystr='/api/products/'+this._id;

   this.$http.get(querystr)
   .then(response => {

     this.product = response.data;
     if(this.product!==undefined)
     {
       this.isFound=true;//alert($stateParams.productID);
     }else {
       this.isFound=false;
     }
   });



  }



  editProduct(){

   /*
    this.$http({
      url:'/api/products/'+this._id+'/upload',
      method:'POST',
      data:{file:this.file}
    }).then(response=>{
        return this.product.imageUrl;

    }).

  */
    var querystr='/api/products/'+this._id;


/*
    this.$http.put(querystr,this.product).then(response => {
     this.$state.go('main');

   }).catch( (error,status)=>{

     this._isValid=false;
     this._errorMsg=error;

   }
*/


   this.$http.put(querystr,this.product)
   .then(response => {
    this.$state.go('main');

  }).catch( (error,status)=>{

    this._isValid=false;
    this._errorMsg=error;

  }

  );


/*
  this._isValid=false;
  this._errorMsg="some error occured";
*/
    //this._products.update(this.product);
    //alert(this.product.price);
    //this.$state.go('main');

  }

  uploadFiles(){

    let fd = new FormData()
    for (const file of this.files) {
        fd.append('files', file)
      }
      //const options = new RequestOptions()
      this.$http.post('/api/products/'+this.product._id+'/upload',fd,
      {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        }).then(response=>{

          this.imageUrl=[]
          for(const data of response.data){
            this.imageUrl.push(data.path)
          }

          this.product.imageUrl=this.imageUrl
          console.log(this.product)
        }).catch((error,status)=>{
          this._isValid=false;
          this._errorMsg=error;
        })


  }

}

ProductsEditController.$inject=['$state','$stateParams','products','$http','$timeout','Upload'];

export default angular.module('editProductComponent', [uiRouter,'myservice'])
  //.config(routing)
  /*.config(function($stateProvider) {
    'ngInject';
    $stateProvider.state('main', {
      url: '/main',
      template: '<main></main>'
    });

  })
  */
  .component('editProduct', {
    template: require('./templates/product-edit.html'),
    controller: ProductsEditController,
    controllerAS:'VM'
  })
  .name;
