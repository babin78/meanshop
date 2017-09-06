'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('main', {
    url: '/',
    template: '<main></main>'
  });

  $stateProvider.state('viewProduct', {
    url: '/:id/view',
    //state:'viewProduct',
    //template: '<main></main>'
    template:'<view-product></view-product>'
    //component:'viewProductComponent'
  });

  $stateProvider.state('newProduct', {
    url:'/product/new',
    //state:'viewProduct',
    //template: '<main></main>'
    template:'<new-product></new-product>'
    //component:'viewProductComponent'
  });
  $stateProvider.state('editProduct', {
    url:'/:id/edit',
    //state:'viewProduct',
    //template: '<main></main>'
    template:'<edit-product></edit-product>'
    //component:'viewProductComponent'
  });
}
