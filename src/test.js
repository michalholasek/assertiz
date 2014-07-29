(function () {
  'use strict';

  module(function () {
    var assert = require('assert');
    var runAsync;
    var runSync;
    
    var Test = function (name, fn, async) {
      this.async = async || false;
      this.name = name;
      this.fn = fn;
    };

    Test.prototype.constructor = Test;

    Test.prototype.run = function (onFinished, onError) {
      if (this.async) {
        runAsync(this, onFinished, onError);
      } else {
        runSync(this, onFinished, onError);
      }
    };

    runAsync = function (test, onFinished, onError) {
      var start = Date.now();
      var timeout = 3000;
      var timer;

      timer = setTimeout(function canceled() {
          test.duration = Date.now() - start;
          test.error = new Error('test timed out');
          test.canceled = true;
          test.passed = false;
          
          onError(test);
        }, timeout);

      test.fn(function done() {
        if (!test.canceled && !assert.error) {
          clearTimeout(timer);

          test.duration = Date.now() - start;
          test.passed = true;

          onFinished(test);
        } else if (assert.error) {
          clearTimeout(timer);

          test.duration = Date.now() - start;
          test.passed = false;
          test.error = assert.error;

          assert.clear();
          onError(test);
        }
      });
    };

    runSync = function (test, onFinished, onError) {
      var start = Date.now();

      test.fn();
      test.duration = Date.now() - start;

      if (!assert.error) {
        test.passed = true;
        onFinished(test);
      } else {
        test.passed = false;
        test.error = assert.error;

        assert.clear();
        onError(test);
      }
    };

    module.$name = 'Test';
    module.exports = Test;
  });
}());
