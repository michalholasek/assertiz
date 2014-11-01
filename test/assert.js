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
      assert.equal(message, 'Value is not true.');
    });

    test('true() - value is not true', function () {
      assert.true(false);
      message = assert.error.message;
      assert.clear();
      assert.equal(message, 'Value is not true.');
    });

    test('true() - value is true', function () {
      assert.true(true);
    });
  });

  suite('assert', function () {
    test('false() - invalid input value (empty string)', function () {
      assert.false('');
      message = assert.error.message;
      assert.clear();
      assert.equal(message, 'Value is not false.');
    });

    test('false() - invalid input value (empty object)', function () {
      assert.false({});
      message = assert.error.message;
      assert.clear();
      assert.equal(message, 'Value is not false.');
    });

    test('false() - invalid input value (undefined)', function () {
      assert.false(undefined);
      message = assert.error.message;
      assert.clear();
      assert.equal(message, 'Value is not false.');
    });

    test('false() - value is not false', function () {
      assert.false(true);
      message = assert.error.message;
      assert.clear();
      assert.equal(message, 'Value is not false.');
    });

    test('false() - value is false', function () {
      assert.false(false);
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
    test('notEqual() - strings (assertiz) are equal', function () {
      assert.notEqual('assertiz', 'assertiz');
      message = assert.error.message;
      assert.clear();
      assert.equal(message, 'assertiz is equal to assertiz');
    });

    test('notEqual() - nulls are equal', function () {
      assert.notEqual(null, null);
      message = assert.error.message;
      assert.clear();
      assert.equal(message, 'null is equal to null');
    });

    test('notEqual() - {} are not equal', function () {
      assert.notEqual({}, {});
    });

    test('notEqual() - 0 and \'\' are not equal', function () {
      assert.notEqual(0, '');
    });
  });

  suite('assert', function () {
    test('deepEqual() - arrays are deep equal (1)', function () {
      assert.deepEqual([], []);
    });
    test('deepEqual() - arrays are deep equal (2)', function () {
      assert.deepEqual([1, 2, [3, 4], 5, 6], [1, 2, [3, 4], 5, 6]);
    });
    test('deepEqual() - arrays are deep equal (3)', function () {
      assert.deepEqual([1, [2, [3, 4], 5], 6], [1, [2, [3, 4], 5], 6]);
    });
    test('deepEqual() - arrays are deep equal (4)', function () {
      assert.deepEqual([[[NaN]]], [[[NaN]]]);
    });
    test('deepEqual() - arrays are deep equal (5)', function () {
      assert.deepEqual([NaN, 0, [1, [2, [3, [4]]]]], [NaN, 0, [1, [2, [3, [4]]]]]);
    });
  });

  suite('assert', function () {
    test('notDeepEqual() - arrays are not deep equal (1)', function () {
      assert.notDeepEqual([], [[]]);
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
    test('throws() - input block is not a function', function () {
      assert.throws({});
      message = assert.error.message;
      assert.clear();
      assert.equal(message, 'Block is not a function.');
    });

    test('throws() - input block does not throw an error', function () {
      assert.throws(function () {});
      message = assert.error.message;
      assert.clear();
      assert.equal(message, 'Block did not throw an error.');
    });

    test('throws() - comparer function does not return true', function () {
      var expected;
      var actual;

      actual = function () {
        throw new Error('Actual error message.');
      };

      expected = function () {};
      
      assert.throws(actual, expected);
      message = assert.error.message;
      assert.clear();
      assert.equal(message, 'Comparer function did not return true.');
    });

    test('throws() - input fn throws an error', function () {
      assert.throws(function () {
        throw new Error('Actual error message.');
      });
    });

    test('throws() - comparer function returns true', function () {
      var expected;
      var actual;

      actual = function () {
        throw new Error('Expected error message.');
      };

      expected = function (err) {
        if (err.message === 'Expected error message.') {
          return true;
        }
      };
      
      assert.throws(actual, expected);
    });
  });
}());
