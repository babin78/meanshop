/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/products              ->  index
 * POST    /api/products              ->  create
 * GET     /api/products/:id          ->  show
 * PUT     /api/products/:id          ->  upsert
 * PATCH   /api/products/:id          ->  patch
 * DELETE  /api/products/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Product from './product.model';
var path = require('path');

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      let myobj=entity
      let mypatches = patches
      /*[
         {op:"replace", path:"/name", value:"kaka" },
         {op:"add", path:"./lastName", value:"Wester" }
        // , {op:"add", path:"/contactDetails/phoneNumbers/0", value:{ number:"555-123" }  }
         ];
         */
      //let patches=[{ op: "add", path: "/lastName", value: "Wester" }]
      //console.log('before:'+ JSON.stringify( myobj))
      //console.log('patch:'+JSON.stringify( mypatches))
      entity=jsonpatch.applyPatch(myobj, mypatches).newDocument;
      //console.log('after:'+JSON.stringify( entity))

    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Products
export function index(req, res) {
  return Product.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Product from the DB
export function show(req, res) {
  return Product.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Product in the DB
export function create(req, res) {
  return Product.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Product in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Product.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Product in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Product.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Product from the DB
export function destroy(req, res) {
  return Product.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

function saveFile(res, file) {
  return function(entity){
    //console.log(file);
    var newPath = '/assets/uploads/' + file.name;

    //var newPath = '/assets/uploads/' + file.;
    entity.imageUrl = newPath;
    return entity.saveAsync().spread(function(updated) {
      console.log(updated);
      return updated;
    });
  }
}

export function upload (req, res) {

//if(err){return res.send('some error occured');}
//console.log(req.files);
/*
let obj=[
  {
    fieldname: "files",
    originalname: "20170205_153347.jpg",
  encoding: "7bit",
    mimetype: "image/jpeg",
    destination: "client/assets/uploads/",
    filename: "1504708603949.jpeg",
    path: "client\\assets\\uploads\\1504708603949.jpeg",
    size: 22582
  }
];
*/
//console.log('before set'+obj)
//obj=res
console.log(req.files);
res.send(JSON.stringify(req.files));
res.end();
//this.files=req.files;
/*if(err){
  res.status(500).send(err);
}
else{
console.log(req);
  if(req.file)
  {
     console.log(req.file);
  }
  res.status(200).send('OK');
//}
*/
//res.status(200).send('OK'+req.file.path);
/*
return Product.findById(req.params.id).exec()
  .then(handleEntityNotFound(res))
  .then(patchUpdates([ { "op": "add", "path": "/imageUrl", "value": req.file.path }]))
  .then(respondWithResult(res))
  .catch(handleError(res));



  /*
  Product.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveFile(res, file))
    .then(respondWithResult(res))
    .catch(handleError(res));
*/
}
