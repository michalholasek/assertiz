(function () {
  'use strict';

  var assert = {};
  var fail;

  assert.clear = function () {
    if (assert.error) {
      delete assert.error;
    }
  };

  assert.equal = function (actual, expected) {
    if (actual !== expected) {
      fail(actual + ' is not equal to ' + expected);
    }
  };

  assert.throws = function (fn, comparer) {
    try {
      if (!isFunction(fn)) {
        fail('fn is not a function');
      } else {
        fn();
        fail('function did not throw an error');
      }
    } catch (err) {
      if (isFunction(comparer) && !comparer(err)) {
        fail('comparer function did not return true');
      }
    }
  };

  assert.true = function (value) {
    if (typeof value !== 'boolean' || !value) {
      fail('value is not true');
    }
  };

  fail = function (message) {
    assert.error = new Error(message);
  };
  
  if (!isUndefined(window)) {
    module.register('assert', assert);
  } else {
    module.exports = assert;  
  }
}());
