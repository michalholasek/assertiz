(function () {
  'use strict';

  module('assert', function () {
    var isPrimitive = require('utils').isPrimitive;
    var objectType = require('utils').objectType;
    var isBoolean = require('utils').isBoolean;
    var isNaN = require('utils').isNaN;
    var innerDeepEqual;
    var compareArrays;
    var assert = {};
    var compareNaNs;
    var msg = '';
    var fail;

    assert.clear = function () {
      if (assert.error) {
        delete assert.error;
      }
    };

    assert.deepEqual = function (actual, expected) {
      var typeA = '';
      var typeB = '';

      msg = 'actual is not deep equal to expected';

      typeA = objectType(actual);
      typeB = objectType(expected);

      if (typeA !== typeB) return fail(msg);

      if (isPrimitive(actual) && isPrimitive(expected)) {
        return assert.equal(actual, expected);
      }

      innerDeepEqual(actual, expected);
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

    assert.notDeepEqual = function (actual, expected) {
      assert.deepEqual(actual, expected);
      if (!assert.error) {
        fail('actual is deep equal to expected');
      } else {
        delete assert.error;
      }
    };

    assert.notEqual = function (actual, expected) {
      if (actual === expected) {
        fail(actual + ' is equal to ' + expected);
      }
    };

    assert.throws = function (fn, comparer) {
      var isFunction = require('utils').isFunction;
      
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

    compareArrays = function (valuesA, valuesB) {
      var valA = valuesA.shift();
      var valB = valuesB.shift();
      var typeA = '';
      var typeB = '';

      typeA = objectType(valA);
      typeB = objectType(valB);

      if (typeA !== typeB) return fail(msg);  
      if (isPrimitive(valA) && !isNaN(valA) && valA === valB) return;
      if (isPrimitive(valA) && compareNaNs(valA, valB)) return;
      if (typeA === 'array' && valA.length !== valB.length) return fail(msg);

      for (var i = 0; i < valA.length; i++) {
        if (isPrimitive(valA[i]) && !isNaN(valA[i]) && valA[i] !== valB[i]) return fail(msg);
        if (isPrimitive(valA[i]) && !compareNaNs(valA[i], valB[i])) return fail(msg);

        if (objectType(valA[i]) === 'array') {
          valuesA.push(valA[i]);
          valuesB.push(valB[i]);
        }
      }
    };

    compareNaNs = function (valA, valB) {
      return isNaN(valA) === isNaN(valB);
    };

    fail = function (message) {
      assert.error = new Error(message);
    };

    innerDeepEqual = function (actual, expected) {
      var valuesA = [];
      var valuesB = [];

      if (objectType(actual) === 'array') {
        if (actual.length !== expected.length) return fail(msg);

        for (var i = 0; i < actual.length; i++) {
          valuesA.push(actual[i]);
          valuesB.push(expected[i]);
        }

        while (valuesA.length) {
          if (!assert.error) compareArrays(valuesA, valuesB); else break;
        }
      }
    };
    
    module.exports = assert;
  });
}());
