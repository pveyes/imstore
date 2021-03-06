# ImStore [![Build Status](https://travis-ci.org/pveyes/imstore.svg?branch=master)](https://travis-ci.org/pveyes/imstore)

[Immutable](https://github.com/facebook/immutable-js) javascript in-memory store

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
var imstore = require('imstore');
var store = imstore();

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
