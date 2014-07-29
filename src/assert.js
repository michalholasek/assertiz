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
