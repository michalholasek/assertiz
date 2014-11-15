(function () {
  'use strict';

  var assertiz = require('assertiz');
  var assert = require('assert');
  var suite = assertiz.suite;
  var test = assertiz.test;

  suite('assert', function () {
    test('true() - invalid input value', function () {
      assert.true('', 'Value is true.');
      if (assert.error) assert.clear();
      else assert.true(false, 'Value is true.');
    });

    test('true() - value is not true', function () {
      assert.true(false, 'Value is true.');
      if (assert.error) assert.clear();
      else assert.true(false, 'Value is true.');
    });

    test('true() - value is true', function () {
      assert.true(true, 'Value is not true.');
    });
  });

  suite('assert', function () {
    test('false() - invalid input value (empty string)', function () {
      assert.false('', 'Value is false.');
      if (assert.error) assert.clear();
      else assert.true(false, 'Value is false.');
    });

    test('false() - invalid input value (empty object)', function () {
      assert.false({}, 'Value is false.');
      if (assert.error) assert.clear();
      else assert.true(false, 'Value is false.');
    });

    test('false() - invalid input value (undefined)', function () {
      assert.false(undefined, 'Value is false.');
      if (assert.error) assert.clear();
      else assert.true(false, 'Value is false.');
    });

    test('false() - value is not false', function () {
      assert.false(true, 'Value is false.');
      if (assert.error) assert.clear();
      else assert.true(false, 'Value is false.');
    });

    test('false() - value is false', function () {
      assert.false(false, 'Value is not false.');
    });
  });

  suite('assert', function () {
    test('equal() - values are not equal', function () {
      assert.equal(0, 1, '0 is equal to 1.');
      if (assert.error) assert.clear();
      else assert.true(false, '0 is equal to 1.');
    });

    test('equal() - values are equal', function () {
        assert.equal(0, 0, '0 is not equal to 0.');
      });
  });

  suite('assert', function () {
    test('notEqual() - strings are equal', function () {
      assert.notEqual('assertiz', 'assertiz', 'assertiz is equal to assertiz.');
      if (assert.error) assert.clear();
      else assert.true(false, 'assertiz is equal to assertiz.');
    });

    test('notEqual() - nulls are equal', function () {
      assert.notEqual(null, null, 'null is equal to null.');
      if (assert.error) assert.clear();
      else assert.true(false, 'null is equal to null.');
    });

    test('notEqual() - {} are not equal', function () {
      assert.notEqual({}, {}, '{} is equal to {}.');
    });

    test('notEqual() - 0 and \'\' are not equal', function () {
      assert.notEqual(0, '', '0 is not equal to \'\'');
    });
  });

  suite('assert', function () {
    test('deepEqual() - arrays are deep equal (1)', function () {
      assert.deepEqual([], [], '[] is deep equal to [].');
    });

    test('deepEqual() - arrays are deep equal (2)', function () {
      assert.deepEqual(
        [1, 2, [3, 4], 5, 6], [1, 2, [3, 4], 5, 6], 'Given arrays are not deep equal.'
      );
    });

    test('deepEqual() - arrays are deep equal (3)', function () {
      assert.deepEqual(
        [1, [2, [3, 4], 5], 6], [1, [2, [3, 4], 5], 6], 'Given arrays are not deep equal.'
      );
    });

    test('deepEqual() - arrays are deep equal (4)', function () {
      assert.deepEqual([[[NaN]]], [[[NaN]]], '[[[NaN]]] and [[[NaN]]] are deep equal.');
    });

    test('deepEqual() - arrays are deep equal (5)', function () {
      assert.deepEqual(
        [NaN, 0, [1, [2, [3, [4]]]]],
        [NaN, 0, [1, [2, [3, [4]]]]],
        'Given arrays are not deep equal.'
      );
    });

    test('deepEqual() - arrays are not deep equal (1)', function () {
      assert.deepEqual([], [[]], '[] is not deep equal to [[]].');
      if (assert.error) assert.clear();
      else assert.true(false, '[] is not deep equal to [[]].');
    });

    test('deepEqual() - arrays are not deep equal (2)', function () {
      assert.deepEqual([1, [2, 3], [[4]]], [[]], '[1, [2, 3], [[4]]] is not deep equal to [[]].');
      if (assert.error) assert.clear();
      else assert.true(false, '[1, [2, 3], [[4]]] is not deep equal to [[]].');
    });

    test('deepEqual() - arrays are not deep equal (3)', function () {
      assert.deepEqual([undefined, NaN, null], [[''], false], 'Given arrays are not deep equal.');
      if (assert.error) assert.clear();
      else assert.true(false, 'Given arrays are not deep equal.');
    });

    test('deepEqual() - objects are deep equal (1)', function () {
      var expected = { prop1: 'prop1', prop2: 2, prop3: undefined };
      var actual = { prop1: 'prop1', prop2: 2, prop3: undefined };
      assert.deepEqual(actual, expected, 'Given objects are not deep equal.');
    });

    test('deepEqual() - objects are deep equal (2)', function () {
      var expected = { prop1: { prop1: { prop1: 'Value' } } };
      var actual = { prop1: { prop1: { prop1: 'Value' } } };
      assert.deepEqual(actual, expected, 'Given objects are not deep equal.');
    });

    test('deepEqual() - objects are deep equal (3)', function () {
      var expected = { prop1: { prop1: '' }, prop2: { prop1: 1 } };
      var actual = { prop1: { prop1: '' }, prop2: { prop1: 1 } };
      assert.deepEqual(actual, expected, 'Given objects are not deep equal.');
    });

    test('deepEqual() - objects are deep equal (4)', function () {
      var expected = { prop1: { prop1: [1, 2, 3] }, prop2: { prop1: 1 } };
      var actual = { prop1: { prop1: [1, 2, 3] }, prop2: { prop1: 1 } };
      assert.deepEqual(actual, expected, 'Given objects are not deep equal.');
    });

    test('deepEqual() - objects are deep equal (5)', function () {
      var expected = { prop1: { prop1: [NaN] }, prop2: { prop1: 1 } };
      var actual = { prop1: { prop1: [NaN] }, prop2: { prop1: 1 } };
      assert.deepEqual(actual, expected, 'Given objects are not deep equal.');
    });

    test('deepEqual() - objects are deep equal (6)', function () {
      var expected = { prop1: { prop1: new RegExp('abc', 'gmi') }, prop2: { prop1: 1 } };
      var actual = { prop1: { prop1: new RegExp('abc', 'gmi') }, prop2: { prop1: 1 } };
      assert.deepEqual(actual, expected, 'Given objects are not deep equal.');
    });

    test('deepEqual() - objects are deep equal (7)', function () {
      var expected = { prop1: { prop1: [/abc/gmi] }, prop2: { prop1: 1 } };
      var actual = { prop1: { prop1: [/abc/gmi] }, prop2: { prop1: 1 } };
      assert.deepEqual(actual, expected, 'Given objects are not deep equal.');
    });

    test('deepEqual() - objects are deep equal (8)', function () {
      var expected = { prop1: { prop1: new Date(2014, 11, 15) }, prop2: { prop1: 1 } };
      var actual = { prop1: { prop1: new Date(2014, 11, 15) }, prop2: { prop1: 1 } };
      assert.deepEqual(actual, expected, 'Given objects are not deep equal.');
    });

    test('deepEqual() - objects are deep equal (9)', function () {
      var expected = { prop1: { prop1: [new Date(2014, 11, 15)] }, prop2: { prop1: 1 } };
      var actual = { prop1: { prop1: [new Date(2014, 11, 15)] }, prop2: { prop1: 1 } };
      assert.deepEqual(actual, expected, 'Given objects are not deep equal.');
    });
  });

  suite('assert', function () {
    test('notDeepEqual() - arrays are not deep equal', function () {
      assert.notDeepEqual([], [[]], '[] and [[]] are deep equal.');
    });

    test('notDeepEqual() - objects are not deep equal (1)', function () {
      assert.notDeepEqual([], {}, '[] and {} are deep equal.');
    });

    test('notDeepEqual() - objects are not deep equal (2)', function () {
      var MyClass = function () {};
      var expected = new MyClass();
      assert.notDeepEqual({}, expected, '[] and {} are deep equal.');
    });

    test('notDeepEqual() - objects are not deep equal (3)', function () {
      var actual = { prop1: 1 };
      var expected = { prop2: 1 };
      assert.notDeepEqual(actual, expected, 'Given objects are deep equal.');
    });

    test('notDeepEqual() - objects are not deep equal (4)', function () {
      var actual = { prop1: 1 };
      var expected = { prop1: '' };
      assert.notDeepEqual(actual, expected, 'Given objects are deep equal.');
    });

    test('notDeepEqual() - objects are not deep equal (5)', function () {
      var actual = { prop1: [1, 2, 3] };
      var expected = { prop1: [1, 2] };
      assert.notDeepEqual(actual, expected, 'Given objects are deep equal.');
    });

    test('notDeepEqual() - objects are not deep equal (6)', function () {
      var actual = { prop1: [1, 2, 3] };
      var expected = { prop1: [1, 2, 4] };
      assert.notDeepEqual(actual, expected, 'Given objects are deep equal.');
    });

    test('notDeepEqual() - objects are not deep equal (7)', function () {
      var actual = { prop1: { prop1: '' } };
      var expected = { prop1: { prop1: 'Value' } };
      assert.notDeepEqual(actual, expected, 'Given objects are deep equal.');
    });

    test('notDeepEqual() - objects are not deep equal (8)', function () {
      var actual = { prop1: { prop1: /abc/g } };
      var expected = { prop1: { prop1: /abc/i } };
      assert.notDeepEqual(actual, expected, 'Given objects are deep equal.');
    });

    test('notDeepEqual() - objects are not deep equal (9)', function () {
      var actual = { prop1: { prop1: new Date(2014, 11, 1) } };
      var expected = { prop1: { prop1: new Date(2014, 11, 2) } };
      assert.notDeepEqual(actual, expected, 'Given objects are deep equal.');
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
      var message = '';
      assert.throws('', null, 'Block is not a function.');
      message = assert.error.message;
      assert.clear();
      assert.equal(message, 'Block is not a function.');
    });

    test('throws() - input block does not throw an error', function () {
      var message = '';
      assert.throws(function () {}, null, 'Block did not throw an error.');
      message = assert.error.message;
      assert.clear();
      assert.equal(message, 'Block did not throw an error.');
    });

    test('throws() - comparer function does not return true', function () {
      var message = '';
      var expected;
      var actual;

      actual = function () {
        throw new Error('Actual error message.');
      };

      expected = function () {};
      
      assert.throws(actual, expected, 'Comparer function returned true.');
      message = assert.error.message;
      assert.clear();
      assert.equal(message, 'Comparer function returned true.');
    });

    test('throws() - input block throws an error', function () {
      assert.throws(function () {
        throw new Error('Actual error message.');
      }, null, 'Block did not throw an error.');
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
      
      assert.throws(actual, expected, 'Comparer function returned false.');
    });
  });
}());
