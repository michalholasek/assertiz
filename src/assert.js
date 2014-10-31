(function () {
  'use strict';

  module('assert', function () {
    var isPrimitive = require('utils').isPrimitive;
    var isFunction = require('utils').isFunction;
    var objectType = require('utils').objectType;
    var isBoolean = require('utils').isBoolean;
    var isObject = require('utils').isObject;
    var isArray = require('utils').isArray;
    var assert = {};
    var fail;

    assert.clear = function () {
      if (assert.error) {
        delete assert.error;
      }
    };

    assert.deepEqual = function (actual, expected) {
      var callbacksA = [];
      var callbacksB = [];
      var valuesA = [];
      var valuesB = [];
      var typeA = '';
      var typeB = '';

      typeA = objectType(actual);
      typeB = objectType(expected);

      if (typeA !== typeB) {
        fail(actual + 'is not deep equal to' + expected);
      }

      if (isPrimitive(actual) && isPrimitive(expected)) {
        return this.equal(actual, expected);
      }

      if (typeA === 'object') {
        // Implement for object
      }

      if (typeA === 'array') {
        // Implement for array
      }
    };

    assert.equal = function (actual, expected) {
      if (actual !== expected) {
        fail(actual + ' is not equal to ' + expected);
      }
    };

    assert.false = function (value) {
      if (!isBoolean(value) || value) {
        fail('value is not false');
      }
    };

    assert.notEqual = function (actual, expected) {
      if (actual === expected) {
        fail(actual + ' is equal to ' + expected);
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
      if (!isBoolean(value) || !value) {
        fail('value is not true');
      }
    };

    fail = function (message) {
      assert.error = new Error(message);
    };
    
    module.exports = assert;
  });
}());
