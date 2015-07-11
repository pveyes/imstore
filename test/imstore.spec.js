var chai = require('chai');
var should = chai.should();

var imstore = require('../lib/imstore');

describe('imstore', function() {
  var store = imstore()

  beforeEach(function() {
    store.reset();
  });

  it('should be able to be used with new keyword', function() {
    var x = new imstore();
    x.constructor.should.be.equal(imstore);
  });

  it('should be able to be used without new keyword', function() {
    var x = imstore();
    x.constructor.should.be.equal(imstore);
  });

  it('should be able to store string', function() {
    var key = 'string';
    var value = 'value';
    store.set(key, value);

    store.get(key).should.be.equal(value);
  });

  it('should be able to store integer', function() {
    var key = 'integer';
    var value = 23423432432;
    store.set(key, value);

    store.get(key).should.be.equal(value);
  });

  it('should be able to store float', function() {
    var key = 'float';
    var value = 23423.432432;
    store.set(key, value);

    store.get(key).should.be.equal(value);
  });

  it('should be able to store array as immutable', function() {
    var key = 'array';
    var value = ['a', 'bc', 1, 23];
    store.set(key, value);

    var valueFromStore = store.get(key);
    valueFromStore.should.be.deep.equal(value);

    // try to change via 'reference'
    valueFromStore[0] = 'z';
    valueFromStore[4] = 11111;

    // test for immutability
    store.get(key).should.be.deep.equal(value);
  });

  it('should be able to store object as immutable', function() {
    var key = 'object';
    var value = {a: 'b', cd: 'ef'};
    store.set(key, value);

    var valueFromStore = store.get(key);
    valueFromStore.should.be.deep.equal(value);

    // try to change via 'reference'
    valueFromStore.a = 'z';
    valueFromStore.nan = 'nooo';

    // test for immutability
    store.get(key).should.be.deep.equal(value);
  });

  it('should be able to store complex object as immutable', function() {
    var key = 'object';
    var value = {a: 'b', c: ['de', {f: 12}]};
    store.set(key, value);

    var valueFromStore = store.get(key);
    valueFromStore.should.be.deep.equal(value);

    // try to change via 'reference'
    valueFromStore.c.push('lol');
    valueFromStore.c[1].f = {};

    // test for immutability
    store.get(key).should.be.deep.equal(value);
  });

  it('should be able to store multiple times', function() {
    var keys = ['key1', 'key2', 'randm'];
    for (var i = 0; i < keys.length; i++) {
      store.set(keys[i], Math.random());
    }

    store.size().should.be.equal(keys.length);
  });

  it('should be able to delete some key-value pair', function() {
    var keys = ['key1', 'key2', 'randm'];
    for (var i = 0; i < keys.length; i++) {
      store.set(keys[i], Math.random());
    }

    store.delete(keys[1]);

    store.keys().length.should.be.equal(keys.length - 1);
    should.not.exist(store.get(keys[1]));
  });

  it('should be able to delete all stored data', function() {
    var keys = ['key1', 'key2', 'randm'];
    for (var i = 0; i < keys.length; i++) {
      store.set(keys[i], Math.random());
    }

    store.clear();

    store.size().should.be.equal(0);
    should.not.exist(store.get(keys[0]));
    should.not.exist(store.get(keys[1]));
    should.not.exist(store.get(keys[2]));
  });

  it('should be able to return all stored keys', function() {
    store.keys().length.should.be.equal(0);

    var keys = ['key1', 'key2', 'randm'];
    for (var i = 0; i < keys.length; i++) {
      store.set(keys[i], Math.random());
    }

    store.keys().should.be.deep.equal(keys);
  });

});
