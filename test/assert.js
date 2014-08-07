(function () {
  'use strict';

  var test = require('assertiz').test;
  var assert = require('assert');
  var message = '';

  test('assert~true should set assert~error when given invalid input value',
    function () {
      assert.true('');
      message = assert.error.message;
      assert.clear();
      assert.equal(message, 'value is not true');
    }
  );

  test('assert~true should set assert~error when input value is not true',
    function () {
      assert.true(false);
      message = assert.error.message;
      assert.clear();
      assert.equal(message, 'value is not true');
    }
  );

  test('assert~true should pass when input value is true',
    function () {
      assert.true(true);
    }
  );

  test('assert~equal should set assert~error when actual and expected ' +
       'values are not equal', function () {
      assert.equal(0, 1);
      message = assert.error.message;
      assert.clear();
      assert.equal(message, '0 is not equal to 1');
    }
  );

  test('assert~equal should pass when actual and expected values are equal',
    function () {
      assert.equal(0, 0);
    }
  );

  test('assert~clear should delete assert~error property', function () {
    assert.error = new Error('assert~error property set');
    assert.clear();
    assert.equal(typeof assert.error, typeof undefined);
  });

  test('assert~throws should set assert~error when input fn is not a function',
    function () {
      assert.throws({});
      message = assert.error.message;
      assert.clear();
      assert.equal(message, 'fn is not a function');
    }
  );

  test('assert~throws should set assert~error when input fn does ' +
       'not throw an error', function () {
      assert.throws(function () {});
      message = assert.error.message;
      assert.clear();
      assert.equal(message, 'function did not throw an error');
    }
  );

  test('assert~throws should set assert~error when input comparer ' +
       'function does not return true', function () {
      assert.throws(
        function () {
          throw new Error('actual error message');
        },
        function () {}
      );
      message = assert.error.message;
      assert.clear();
      assert.equal(message, 'comparer function did not return true');
    }
  );

  test('assert~throws should pass when input fn throws an error', function () {
    assert.throws(function () {
      throw new Error('actual error message');
    });
  });

  test('assert~throws should pass when comparer function returns true',
    function () {
      assert.throws(
        function () {
          throw new Error('expected error message');
        },
        function (err) {
          if (err.message === 'expected error message') {
            return true;
          }
        }
      );
    }
  );
}());
