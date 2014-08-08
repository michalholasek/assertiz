(function () {
  'use strict';

  var assertiz = require('assertiz');
  var assert = require('assert');
  var suite = assertiz.suite;
  var test = assertiz.test;
  var message = '';

  suite('assert', function () {
    test('true() - invalid input value', function () {
      assert.true('');
      message = assert.error.message;
      assert.clear();
      assert.equal(message, 'value is not true');
    });

    test('true() - value is not true', function () {
      assert.true(false);
      message = assert.error.message;
      assert.clear();
      assert.equal(message, 'value is not true');
    });

    test('true() - value is true', function () {
      assert.true(true);
    });
  });

  suite('assert', function () {
    test('equal() - values are not equal', function () {
      assert.equal(0, 1);
      message = assert.error.message;
      assert.clear();
      assert.equal(message, '0 is not equal to 1');
    });

    test('equal() - values are equal', function () {
        assert.equal(0, 0);
      });
  });

  suite('assert', function () {
    test('clear() - deletes assert~error property', function () {
      assert.error = new Error('assert~error property set');
      assert.clear();
      assert.equal(assert.error, undefined);
    });
  });

  suite('assert', function () {
    test('throws() - input fn is not a function', function () {
      assert.throws({});
      message = assert.error.message;
      assert.clear();
      assert.equal(message, 'fn is not a function');
    });

    test('throws() - input fn does not throw an error', function () {
      assert.throws(function () {});
      message = assert.error.message;
      assert.clear();
      assert.equal(message, 'function did not throw an error');
    });

    test('throws() - comparer function does not return true', function () {
      var expected;
      var actual;

      actual = function () {
        throw new Error('actual error message');
      };

      expected = function () {};
      
      assert.throws(actual, expected);
      message = assert.error.message;
      assert.clear();
      assert.equal(message, 'comparer function did not return true');
    });

    test('throws() - input fn throws an error', function () {
      assert.throws(function () {
        throw new Error('actual error message');
      });
    });

    test('throws() - comparer function returns true', function () {
      var expected;
      var actual;

      actual = function () {
        throw new Error('expected error message');
      };

      expected = function (err) {
        if (err.message === 'expected error message') {
          return true;
        }
      };
      
      assert.throws(actual, expected);
    });
  });
}());
