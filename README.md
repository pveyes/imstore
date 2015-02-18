# ImStore [![Build Status](https://travis-ci.org/virtualc/imstore.svg)](https://travis-ci.org/virtualc/imstore)

Immutable in-memory store for javascript

## Why?

Because of this

```js
// mutable in-memory store
var store = require('some-mutable-store');

var key = 'xxx';
var value = {a: 'b', cd: [1, 23]};

// save to memory
store.set(key, value);

var getValue = store.get(key);
getValue.a = ['b'];
getValue.cd = [];
getValue.c = 2

console.log(store.get(key));
// {a: ['b'], cd: [], c: 2}
// WHOOPS storage updated itself!
```

## Usage

Install via npm

```
$ npm install imstore
```

API is simple and straightforward:

```js
var Store = require('imstore');
var store = new Store();

// saving value
store.set(key, value);
// or
store.put(key, value);

// get value
store.get(key);

// clear some data
store.delete(key);

// get all available keys
store.keys();

// clear all data in memory
store.clear();
// or
store.flush();
// or
store.reset();
```

## License

MIT
