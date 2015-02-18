jest.autoMockOff();

var ImStore = require('../lib/ImStore');
var store = new ImStore();

describe('imstore', function() {

  beforeEach(function() {
    store.reset();
  })

  it('can store string', function() {
    var key = 'string';
    var value = 'value';
    store.set(key, value);

    var getValue = store.get(key);
    expect(getValue).toBe(value);
  });

  it('can store integer', function() {
    var key = 'integer';
    var value = 23423432432;
    store.set(key, value);

    var getValue = store.get(key);
    expect(getValue).toBe(value);
  });

  it('can store float', function() {
    var key = 'float';
    var value = 23423.432432;
    store.set(key, value);

    var getValue = store.get(key);
    expect(getValue).toBe(value);
  });

  it('can store array as immutable', function() {
    var key = 'array';
    var value = ['a', 'bc', 1, 23];
    store.set(key, value);

    var getValue = store.get(key);
    expect(getValue).toBeDefined();
    expect(getValue[0]).toBe('a');
    expect(getValue[1]).toBe('bc');
    expect(getValue[2]).toBe(1);
    expect(getValue[3]).toBe(23);

    // try to change via 'reference'
    getValue[0] = 'z';
    getValue[4] = 11111;

    // test for immutability
    var anotherGetValue = store.get(key);
    expect(anotherGetValue[0]).toBe('a');
    expect(anotherGetValue[4]).not.toBeDefined();
  });

  it('can store object as immutable', function() {
    var key = 'object';
    var value = {a: 'b', cd: 'ef'};
    store.set(key, value);

    var getValue = store.get(key);
    expect(getValue).toBeDefined();
    expect(getValue.a).toBe('b');
    expect(getValue.cd).toBe('ef');

    // try to change via 'reference'
    getValue.a = 'z';
    getValue.nan = 'nooo';

    // test for immutability
    var anotherGetValue = store.get(key);
    expect(anotherGetValue.a).toBe('b');
    expect(anotherGetValue.nan).not.toBeDefined();
  });

  it('can store complex object as immutable', function() {
    var key = 'object';
    var value = {a: 'b', c: ['de', {f: 12}]};
    store.set(key, value);

    var getValue = store.get(key);
    expect(getValue).toBeDefined();
    expect(getValue.a).toBe('b');
    expect(getValue.c.length).toBe(2);
    expect(getValue.c[0]).toBe('de');
    expect(getValue.c[1].f).toBe(12);

    // try to change via 'reference'
    getValue.c.push('lol');
    getValue.c[1].f = {};

    // test for immutability
    var anotherGetValue = store.get(key);
    expect(anotherGetValue.c.length).toBe(2);
    expect(anotherGetValue.c[1].f).toBe(12);
  });

  it('can delete some key-value pair', function() {
    var keys = ['key1', 'key2', 'randm'];
    for (var i = 0; i < keys.length; i++) {
      store.set(keys[i], Math.random());
    }

    store.delete(keys[1]);

    var storedKeys = store.keys();
    var deletedValue = store.get(keys[1]);
    expect(storedKeys.length).toBe(keys.length - 1);
    expect(deletedValue).toBeNull();
  });

  it('can store multiple times', function() {
    var keys = ['key1', 'key2', 'randm'];
    for (var i = 0; i < keys.length; i++) {
      store.set(keys[i], Math.random());
    }

    var size = store.size();
    expect(size).toBe(keys.length);
  });

  it('can delete all stored data', function() {
    var keys = ['key1', 'key2', 'randm'];
    for (var i = 0; i < keys.length; i++) {
      store.set(keys[i], Math.random());
    }

    store.clear();

    var size = store.size();
    expect(size).toBe(0);
    expect(store.get(keys[0])).toBeNull();
    expect(store.get(keys[1])).toBeNull();
    expect(store.get(keys[2])).toBeNull();
  });

  it('can return all stored keys', function() {
    var storedKeys;

    storedKeys = store.keys();
    expect(storedKeys).toBeDefined();
    expect(storedKeys.length).toBe(0);

    var keys = ['key1', 'key2', 'randm'];
    for (var i = 0; i < keys.length; i++) {
      store.set(keys[i], Math.random());
    }

    storedKeys = store.keys();
    expect(storedKeys).toBeDefined();
    expect(storedKeys.length).toBe(keys.length);
    expect(storedKeys[0]).toBe(keys[0]);
    expect(storedKeys[1]).toBe(keys[1]);
    expect(storedKeys[2]).toBe(keys[2]);
  });

});
