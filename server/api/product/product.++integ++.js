'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newProduct;
var products;
describe('Product API:', function() {
  describe('GET /api/products', function() {


    beforeEach(function(done) {
      request(app)
        .get('/api/products')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          products = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(products).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/products', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/products')
        .send({
          name: 'New Product',
          info: 'This is the brand new product!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newProduct = res.body;
          done();
        });
    });

    it('should respond with the newly created product', function() {
      expect(newProduct.name).to.equal('New Product');
      expect(newProduct.info).to.equal('This is the brand new product!!!');
    });
  });

  describe('GET /api/products/:id', function() {
    var product;

    beforeEach(function(done) {
      request(app)
        .get(`/api/products/${newProduct._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          product = res.body;
          done();
        });
    });

    afterEach(function() {
      product = {};
    });

    it('should respond with the requested product', function() {
      expect(product.name).to.equal('New Product');
      expect(product.info).to.equal('This is the brand new product!!!');
    });
  });

  describe('PUT /api/products/:id', function() {
    var updatedProduct;

    beforeEach(function(done) {
      request(app)
        .put(`/api/products/${newProduct._id}`)
        .send({
          name: 'Updated Product',
          info: 'This is the updated product!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedProduct = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedProduct = {};
    });

    it('should respond with the updated product', function() {
      expect(updatedProduct.name).to.equal('Updated Product');
      expect(updatedProduct.info).to.equal('This is the updated product!!!');
    });

    it('should respond with the updated product on a subsequent GET', function(done) {
      request(app)
        .get(`/api/products/${newProduct._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let product = res.body;

          expect(product.name).to.equal('Updated Product');
          expect(product.info).to.equal('This is the updated product!!!');

          done();
        });
    });
  });

  describe('PATCH /api/products/:id', function() {
    var patchedProduct;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/products/${newProduct._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Product' },
          { op: 'replace', path: '/info', value: 'This is the patched product!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedProduct = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedProduct = {};
    });

    it('should respond with the patched product', function() {
      expect(patchedProduct.name).to.equal('Patched Product');
      expect(patchedProduct.info).to.equal('This is the patched product!!!');
    });
  });

  describe('DELETE /api/products/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/products/${newProduct._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when product does not exist', function(done) {
      request(app)
        .delete(`/api/products/${newProduct._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
