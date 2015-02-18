var Immutable = require('immutable');

/**
 *
 * @constructor
 */
var Imstore = function() {
  this.data = {};
}

/**
 *
 * @param {string} key
 * @param {*} value
 */
Imstore.prototype.set = function(key, value) {
  this.data[key] = this._getImmutableValue(value);
};

/**
 * Alias for .set()
 *
 */
Imstore.prototype.put = Imstore.prototype.set;

/**
 * Get value based on key, return null or value if match
 *
 * @param {string} key
 * @return {?}
 */
Imstore.prototype.get = function(key) {
  return (!this.data[key]) ? null : this._getMutableValue(this.data[key]);
}

/**
 *
 * @param {string} key
 */
Imstore.prototype.delete = function(key) {
  this.data[key] = null;
}

/**
 * Reset in-memory store to initial state
 *
 */
Imstore.prototype.clear = function() {
  this.data = {};
}

/**
 * Alias for .clear()
 *
 */
Imstore.prototype.flush = Imstore.prototype.clear;
Imstore.prototype.reset = Imstore.prototype.clear;

/**
 * Return all keys stored in memory
 *
 * @return {Array.<string>}
 */
Imstore.prototype.keys = function() {
  var keys = [];

  for (var key in this.data) {
    if (!!this.data[key]) {
      keys.push(key);
    }
  }

  return keys;
}

/**
 * Get total number of stored keys
 *
 * @return {number}
 */
Imstore.prototype.size = function() {
  return this.keys().length;
}

/**
 * In javascript, array and object are immutable.
 * When using getter in plain array/object, it will return
 * a reference, and modifying them means also modifying data in store
 * to prevent this we create immutable version for the value
 *
 * @param {*} value
 * @return {Immutable.Map|Immutable.List|*}
 * @private
 */
Imstore.prototype._getImmutableValue = function(value) {
  // Array also instanceof Object
  if (value instanceof Object) {
    return Immutable.fromJS(value);
  }

  return value;
}

/**
 * Revert, just what normal user want
 *
 * @param {Immutable.Map|Immutable.List|*} value
 * @return {*}
 */
Imstore.prototype._getMutableValue = function(value) {
  if (value instanceof Immutable.Map || value instanceof Immutable.List) {
    return value.toJS();
  }

  return value;
}

module.exports = Imstore;
