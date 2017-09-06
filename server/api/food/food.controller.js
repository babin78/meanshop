/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/foods              ->  index
 * POST    /api/foods              ->  create
 * GET     /api/foods/:id          ->  show
 * PUT     /api/foods/:id          ->  upsert
 * PATCH   /api/foods/:id          ->  patch
 * DELETE  /api/foods/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Food from './food.model';

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
      //var obj=JSON.parse(patches)
      // eslint-disable-next-line prefer-reflect
      //console.log('before:'+entity);
      //console.log('patch:'+JSON.stringify(patches))
      //console.log('patch:'+patches)
      //let myobj={ name:"Albert", contactDetails: { phoneNumbers: [ ] } }
      let myobj=entity
      let mypatches = patches
      /*[
         {op:"replace", path:"/name", value:"kaka" },
         {op:"add", path:"./lastName", value:"Wester" }
        // , {op:"add", path:"/contactDetails/phoneNumbers/0", value:{ number:"555-123" }  }
         ];
         */
      //let patches=[{ op: "add", path: "/lastName", value: "Wester" }]
      console.log('before:'+ JSON.stringify( myobj))
      console.log('patch:'+JSON.stringify( mypatches))
      entity=jsonpatch.applyPatch(myobj, mypatches).newDocument;
      console.log('after:'+JSON.stringify( entity))
    } catch(err) {
     console.log(err)
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

// Gets a list of Foods
export function index(req, res) {
  return Food.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Food from the DB
export function show(req, res) {
  return Food.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Food in the DB
export function create(req, res) {
  return Food.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Food in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Food.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Food in the DB
export function patch(req, res) {
  try{
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  console.log('calling patchupdate')
  //console.log('req.body:'+req.body)
  return Food.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
  }
  catch(e){console.log(e)}
}

// Deletes a Food from the DB
export function destroy(req, res) {
  return Food.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
