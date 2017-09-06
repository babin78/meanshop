'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newFood;

describe('Food API:', function() {
  describe('GET /api/foods', function() {
    var foods;

    beforeEach(function(done) {
      request(app)
        .get('/api/foods')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          foods = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(foods).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/foods', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/foods')
        .send({
          name: 'New Food',
          info: 'This is the brand new food!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newFood = res.body;
          done();
        });
    });

    it('should respond with the newly created food', function() {
      expect(newFood.name).to.equal('New Food');
      expect(newFood.info).to.equal('This is the brand new food!!!');
    });
  });

  describe('GET /api/foods/:id', function() {
    var food;

    beforeEach(function(done) {
      request(app)
        .get(`/api/foods/${newFood._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          food = res.body;
          done();
        });
    });

    afterEach(function() {
      food = {};
    });

    it('should respond with the requested food', function() {
      expect(food.name).to.equal('New Food');
      expect(food.info).to.equal('This is the brand new food!!!');
    });
  });

  describe('PUT /api/foods/:id', function() {
    var updatedFood;

    beforeEach(function(done) {
      request(app)
        .put(`/api/foods/${newFood._id}`)
        .send({
          name: 'Updated Food',
          info: 'This is the updated food!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedFood = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedFood = {};
    });

    it('should respond with the updated food', function() {
      expect(updatedFood.name).to.equal('Updated Food');
      expect(updatedFood.info).to.equal('This is the updated food!!!');
    });

    it('should respond with the updated food on a subsequent GET', function(done) {
      request(app)
        .get(`/api/foods/${newFood._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let food = res.body;

          expect(food.name).to.equal('Updated Food');
          expect(food.info).to.equal('This is the updated food!!!');

          done();
        });
    });
  });

  describe('PATCH /api/foods/:id', function() {
    var patchedFood;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/foods/${newFood._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Food' },
          { op: 'replace', path: '/info', value: 'This is the patched food!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedFood = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedFood = {};
    });

    it('should respond with the patched food', function() {
      expect(patchedFood.name).to.equal('Patched Food');
      expect(patchedFood.info).to.equal('This is the patched food!!!');
    });
  });

  describe('DELETE /api/foods/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/foods/${newFood._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when food does not exist', function(done) {
      request(app)
        .delete(`/api/foods/${newFood._id}`)
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
