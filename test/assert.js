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
      assert.equal(message, 'input value is not valid');
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

  test('assert~true should not set assert~error when input value is true',
    function () {
      assert.true(true);
    }
  );

  test('assert~equal should set assert~error when given invalid actual value',
    function () {
      assert.equal(undefined);
      message = assert.error.message;
      assert.clear();
      assert.equal(message, 'actual value is undefined');
    }
  );

  test('assert~equal should set assert~error when given invalid expected value',
    function () {
      assert.equal('');
      message = assert.error.message;
      assert.clear();
      assert.equal(message, 'expected value is undefined');
    }
  );

  test('assert~equal should set assert~error when actual and expected ' +
       'values are not equal',
    function () {
      assert.equal(0, 1);
      message = assert.error.message;
      assert.clear();
      assert.equal(message, '0 is not equal to 1');
    }
  );

  test('assert~equal should not set assert~error when actual and expected ' +
       'values are equal',
    function () {
      assert.equal(0, 0);
    }
  );

  test('assert~clear should delete assert~error property', function () {
    assert.error = new Error('assert~error property set');
    assert.clear();
    assert.equal(typeof assert.error, typeof undefined);
  });
}());
