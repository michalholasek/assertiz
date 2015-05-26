(function () {
  'use strict';

  module('assert', function () {
    var isPrimitive = require('utils').isPrimitive;
    var isUndefined = require('utils').isUndefined;
    var isFunction = require('utils').isFunction;
    var objectType = require('utils').objectType;
    var isBoolean = require('utils').isBoolean;
    var isNaN = require('utils').isNaN;
    var innerDeepEqual;
    var compareRegExps;
    var compareDates;
    var assert = {};
    var decomposed;
    var decompose;
    var normalize;
    var flatten;
    var isValue;
    var fail;
    
    //----------------------------------------------------------------------
    // Public Interface
    //----------------------------------------------------------------------

    assert.clear = function () {
      if (assert.error) delete assert.error;
    };

    assert.deepEqual = function (actual, expected, message) {
      var typeA;
      var typeB;

      if (actual === expected) return;

      typeA = objectType(actual);
      typeB = objectType(expected);
      
      if (typeA !== typeB) return fail(message);

      innerDeepEqual(actual, expected, message);
    };

    assert.equal = function (actual, expected, message) {
      if (actual !== expected) fail(message);
    };

    assert.false = function (value, message) {
      if (!isBoolean(value) || value) fail(message);
    };

    assert.notDeepEqual = function (actual, expected, message) {
      assert.deepEqual(actual, expected, message);
      if (!assert.error) fail(message);
      else delete assert.error;
    };

    assert.notEqual = function (actual, expected, message) {
      if (actual === expected) fail(message);
    };

    assert.throws = function (block, comparer, message) {
      var actual;

      if (!isFunction(block)) return fail(message);
      
      try {
        block();
      } catch (err) {
        actual = err; 
      }

      if (!actual) return fail(message);
      if (isFunction(comparer) && !comparer(actual)) fail(message);
    };

    assert.true = function (value, message) {
      if (!isBoolean(value) || !value) fail(message);
    };

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    compareDates = function (valA, valB, message) {
      if (valA.valueOf() !== valB.valueOf()) fail(message);
    };

    compareRegExps = function (valA, valB, message) {
      if (valA.ignoreCase !== valB.ignoreCase ||
          valA.multiline !== valB.multiline ||
          valA.source !== valB.source ||
          valA.global !== valB.global) fail(message);
    };

    decompose = function decompose(toDecompose, toCompare) {
      var toDecomposeType = objectType(toDecompose);

      if (isUndefined(decompose.decomposed)) decompose.decomposed = [];

      if (toDecomposeType === 'object') {

        // We want to be able to compare 'origin' of the object that
        // is being decomposed, hence the constructor is considered
        // a 'value' here
        toCompare.push(toDecompose.constructor);

        // Store references of already decomposed objects so we don't end
        // up decomposing the same object twice and to avoid circular
        // references
        decompose.decomposed.push(toDecompose);

        toDecompose = normalize(toDecompose);
      }

      if (toDecomposeType === 'array') toCompare.push(toDecompose.length);

      toDecompose.forEach(function (item) {
        // Skip already decomposed objects
        if (decomposed(item)) return;

        if (isValue(item)) toCompare.push(item);
        else decompose(item, toCompare);
      });
    };

    decomposed = function (obj) {
      for (var i = 0; i < decompose.decomposed.length; i++) {
        if (decompose.decomposed[i] === obj) return true;
      }

      return false;
    };

    fail = function (message) {
      assert.error = new Error(message);
    };

    flatten = function (obj) {
      var toCompare = [];
      
      decompose(obj, toCompare);

      return toCompare;
    };

    innerDeepEqual = function (actual, expected, message) {
      var valuesA = flatten(actual);
      var valuesB = flatten(expected);
      var typeA;
      var typeB;
      var valA;
      var valB;

      if (valuesA.length !== valuesB.length) return fail(message);
      
      for (var i = 0; i < valuesA.length; i++) {
        valA = valuesA[i];
        valB = valuesB[i];
        typeA = objectType(valA);
        typeB = objectType(valB);

        if (typeA !== typeB) return fail(message);

        if (typeA === 'regexp') return compareRegExps(valA, valB, message);
        if (typeA === 'date') return compareDates(valA, valB, message);
        if (isNaN(valA) && isNaN(valB)) return;
        if (valA !== valB) fail(message);
      }
    };

    isValue = function (value) {
      var type = objectType(value);

      return type === 'function' ||
             isPrimitive(value) ||
             type === 'regexp' ||
             type === 'date' ||
             isNaN(value);
    };

    normalize = function (obj) {
      var arr = [];

      for (var property in obj) {
        if (obj.hasOwnProperty(property)) {
          // Property names are also compared
          arr.push(property);

          arr.push(obj[property]);
        }
      }

      return arr;
    };
    
    module.exports = assert;
  });
}());
