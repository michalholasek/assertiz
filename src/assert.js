(function () {
  'use strict';

  module(function () {
    var assert = {};
    var fail;

    var messages = {
      comparer: 'comparer function did not return true',
      not: {
        true: 'value is not true',
        fn: 'fn is not a function',
        threw: 'function did not threw an error'
      }
    };

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
          fail(messages.not.fn);
        } else {
          fn();
          fail(messages.not.threw);
        }
      } catch (err) {
        if (isFunction(comparer) && !comparer(err)) {
          fail(messages.comparer);
        }
      }
    };

    assert.true = function (value) {
      if (typeof value !== 'boolean' || !value) {
        fail(messages.not.true);
      }
    };

    fail = function (message) {
      assert.error = new Error(message);
      return;
    };

    module.$name = 'assert';
    module.exports = assert;
  });
}());
