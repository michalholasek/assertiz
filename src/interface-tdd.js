(function () {
  'use strict';

  module(function () {
    var assertiz = require('assertiz');
    var Test = require('Test');
    var test;

    test = function (name, fn, async) {
      if (!name || !isString(name)) {
        throw new Error('test name is not valid');
      }
      if (!fn || !isFunction(fn)) {
        throw new Error('test callback is not valid');
      }
      if (async && typeof async !== 'boolean') {
        throw new Error('value of async is not valid');
      }

      assertiz.addTest(new Test(name, fn, async));
    };

    module.$name = 'interface-tdd';
    module.exports = {
      test: test
    };
  });
}());
