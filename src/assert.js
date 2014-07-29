(function () {
  'use strict';

  module(function () {
    var assert = {};

    assert.clear = function () {
      if (assert.error) {
        delete assert.error;
      }
    };

    assert.equal = function (actual, expected) {
      if (typeof actual === 'undefined') {
        assert.error = new Error('actual value is undefined');
        return;
      }
      if (typeof expected === 'undefined') {
        assert.error = new Error('expected value is undefined');
        return;
      }
      if (actual !== expected) {
        assert.error = new Error(actual + ' is not equal to ' + expected);
      }
    };

    assert.throws = function (fn, comparer) {
      if (!isFunction(fn)) {
        assert.error = new Error('input fn is not a function');
        return;
      }

      try {
        fn();
        assert.error = new Error('input fn does not throw an error');
      } catch (err) {
        if (comparer && !isFunction(comparer)) {
          assert.error = new Error('comparer is not a function');
          return;
        }
        if (comparer && !comparer(err)) {
          assert.error = new Error('comparer function did not return true');
        }
      }
    };

    assert.true = function (value) {
      if (typeof value !== 'boolean') {
        assert.error = new Error('input value is not valid');
        return;
      }
      if (!value) {
        assert.error = new Error('value is not true');
      }
    };

    module.$name = 'assert';
    module.exports = assert;
  });
}());
