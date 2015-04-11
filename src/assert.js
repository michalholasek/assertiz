(function () {
  'use strict';

  module('assert', function () {
    var isPrimitive = require('utils').isPrimitive;
    var isFunction = require('utils').isFunction;
    var objectType = require('utils').objectType;
    var isBoolean = require('utils').isBoolean;
    var isNaN = require('utils').isNaN;
    var compareObjects;
    var innerDeepEqual;
    var compareRegExps;
    var compareArrays;
    var compareDates;
    var assert = {};
    var compare;
    var fail;

    var alreadyDecomposed;
    var decompose;
    var flatten;
    var isValue;

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

    alreadyDecomposed = function (obj) {
      for (var i = 0; i < flatten.decomposed.length; i++) {
        if (flatten.decomposed[i] === obj) return true;
      }
      return false;
    };

    compare = function (valuesA, valuesB, message) {
      var valA = valuesA.shift();
      var valB = valuesB.shift();
      var typeA;
      var typeB;

      // There is no need to test further if values are equal
      if (valA === valB) return;

      // Avoid circular references
      for (var i = 0; i < innerDeepEqual.compared.length; i++) {
        if (innerDeepEqual.compared[i] === valA) return;
      }

      typeA = objectType(valA);
      typeB = objectType(valB);

      if (typeA !== typeB) return fail(message);  
      if (isPrimitive(valA) && !isNaN(valA) && valA === valB) return;
      if (isPrimitive(valA) && isNaN(valA) === isNaN(valB)) return;

      if (typeA === 'object') return compareObjects(valuesA, valuesB, valA, valB, message);
      if (typeA === 'array') return compareArrays(valuesA, valuesB, valA, valB, message);
      if (typeA === 'regexp') return compareRegExps(valA, valB, message);
      if (typeA === 'date') compareDates(valA, valB, message); 
    };

    compareArrays = function (valuesA, valuesB, valA, valB, message) {
      if (valA.length !== valB.length) return fail(message);

      for (var i = 0; i < valA.length; i++) {
        if (isPrimitive(valA[i]) && !isNaN(valA[i]) && valA[i] !== valB[i]) return fail(message);
        if (isPrimitive(valA[i]) && isNaN(valA[i]) !== isNaN(valB[i])) return fail(message);
        
        if (objectType(valA[i]) === 'regexp') compareRegExps(valA[i], valA[i], message);
        if (objectType(valA[i]) === 'date') compareDates(valA[i], valB[i], message);
        if (objectType(valA[i]) === 'array' || objectType(valA[i]) === 'object') {
          valuesA.push(valA[i]);
          valuesB.push(valB[i]);
        }
      }
    };

    compareDates = function (valA, valB, message) {
      if (valA.valueOf() !== valB.valueOf()) fail(message);
    };

    compareObjects = function (valuesA, valuesB, valA, valB, message) {
      if (valA.constructor !== valB.constructor) return fail(message);

      for (var prop in valA) {
        if (valA.hasOwnProperty(prop)) {
          if (!valB.hasOwnProperty(prop)) return fail(message); 
          if (isPrimitive(valA[prop]) && !isNaN(valA[prop]) && valA[prop] !== valB[prop]) return fail(message);
          if (isPrimitive(valA[prop]) && isNaN(valA[prop]) !== isNaN(valB[prop])) return fail(message);
          
          if (objectType(valA[prop]) === 'regexp') compareRegExps(valA[prop], valB[prop], message);
          if (objectType(valA[prop]) === 'date') compareDates(valA[prop], valB[prop], message);
          if (objectType(valA[prop]) === 'array' || objectType(valA[prop]) === 'object') {
            valuesA.push(valA[prop]);
            valuesB.push(valB[prop]);
          }
        }
      }

      innerDeepEqual.compared.push(valA);
    };

    compareRegExps = function (valA, valB, message) {
      if (valA.ignoreCase !== valB.ignoreCase ||
          valA.multiline !== valB.multiline ||
          valA.source !== valB.source ||
          valA.global !== valB.global) fail(message);
    };

    decompose = function (toDecompose, toCompare) {
      var toDecomposeType;
      var nestedType;
      
      // Objects / arrays that will be decomposed in next loop
      var toDecomposeNext = [];
      
      // Represents nested object, eg. [{ prop1: {/* nested */} }],
      // or item in an array
      var nested;
      
      toDecomposeType = objectType(toDecompose);
      if (toDecomposeType === 'object') {

        // We want to be able to compare 'origin' of the object that
        // is being decomposed, hence the constructor is considered
        // a 'value' here
        toCompare.push(toDecompose.constructor);

        // Store references of already decomposed objects so we don't end
        // up decomposing the same object twice and to avoid circular
        // references
        flatten.decomposed.push(toDecompose);
      }

      for (var property in toDecompose) {
        if (toDecompose.hasOwnProperty(property) && !alreadyDecomposed(toDecompose[property])) {
          
          nested = toDecompose[property];
          nestedType = objectType(nested);

          // Names of the object's properties are also compared
          if (toDecomposeType !== 'array' && nestedType === 'object') {
            toCompare.push(property); 
          }

          if (isValue(nested)) toCompare.push(nested);
          
          else {
            if (nestedType === 'object') toCompare.push(nested.constructor);

            flatten.decomposed.push(nested);
            
            for (var prop in nested) {
              if (nested.hasOwnProperty(prop) && !alreadyDecomposed(nested[prop])) {
                if (nestedType === 'object') toCompare.push(prop);

                if (isValue(nested[prop])) toCompare.push(nested[prop]);      
                else toDecomposeNext.push(nested[prop]);
              }  
            }
          }
        }
      }

      return toDecomposeNext;
    };

    fail = function (message) {
      assert.error = new Error(message);
    };

    flatten = function (obj) {
      // debugger;

      var toDecompose = [];
      var toCompare = [];

      flatten.decomposed = [];

      // We need to decompose original object first and then carry on
      // with inner values / objects / arrays
      toDecompose = decompose(obj, toCompare);
      
      while (toDecompose.length) {
        toDecompose = decompose(toDecompose, toCompare);
      }

      return toCompare;
    };

    innerDeepEqual = function (actual, expected, message) {
      var _valuesA = flatten(actual);
      var _valuesB = flatten(expected);

      var valuesA = [];
      var valuesB = [];

      innerDeepEqual.compared = [];

      if (objectType(actual) === 'array') {
        if (actual.length !== expected.length) return fail(message);

        for (var i = 0; i < actual.length; i++) {
          valuesA.push(actual[i]);
          valuesB.push(expected[i]);
        }
      }

      if (objectType(actual) === 'object') {
        if (actual.constructor !== expected.constructor) return fail(message);

        for (var prop in actual) {
          if (actual.hasOwnProperty(prop)) {
            if (!expected.hasOwnProperty(prop)) return fail(message);
            valuesA.push(actual[prop]);
            valuesB.push(expected[prop]);
          }
        }

        innerDeepEqual.compared.push(actual);
      }

      while (valuesA.length) {
        if (!assert.error) compare(valuesA, valuesB, message);
        else return;
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
    
    module.exports = assert;
  });
}());
