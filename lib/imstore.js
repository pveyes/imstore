var Immutable = require('immutable');

module.exports = Imstore;

/**
 *
 * @constructor
 */
function Imstore() {
  if (!(this instanceof Imstore)) { return new Imstore() }

  this.data = Immutable.Map();
}

/**
 *
 * @param {string} key
 * @param {*} value
 */
Imstore.prototype.set = function set(key, value) {
  var fixedValue = this._getImmutableValue(value);
  this.data = this.data.set(key, fixedValue);
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
Imstore.prototype.get = function get(key) {
  var data = this.data.get(key);
  if (!!data) {
    return this._getMutableValue(data);
  }

  return null;
}

/**
 * Alias for .get()
 *
 */
Imstore.prototype.fetch = Imstore.prototype.get;

/**
 *
 * @param {string} key
 */
Imstore.prototype.remove = function remove(key) {
  this.data = this.data.delete(key);
}

/**
 * Alias for .remove()
 *
 */
Imstore.prototype.delete = Imstore.prototype.remove;

/**
 * Reset in-memory store to initial state
 *
 */
Imstore.prototype.clear = function clear() {
  this.data = this.data.clear();
}

/**
 * Alias for .clear()
 *
 */
Imstore.prototype.flush = Imstore.prototype.clear;
Imstore.prototype.reset = Imstore.prototype.clear;
Imstore.prototype.destroy = Imstore.prototype.clear;

/**
 * Return all keys stored in memory
 *
 * @return {Array.<string>}
 */
Imstore.prototype.keys = function keys() {
  var data = this.data.toObject();
  var keys = [];

  for (var key in data) {
    keys.push(key);
  }

  return keys;
}

/**
 * Get total number of stored keys
 *
 * @return {number}
 */
Imstore.prototype.size = function size() {
  return this.data.size;
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
Imstore.prototype._getImmutableValue = function _getImmutableValue(value) {
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
Imstore.prototype._getMutableValue = function _getMutableValue(value) {
  if (value instanceof Immutable.Map || value instanceof Immutable.List) {
    return value.toJS();
  }

  return value;
}
