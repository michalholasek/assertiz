(function () {
  'use strict';

  module(function () {
    var paused = false;
    var assertiz = {};
    var onFinished;
    var queue = [];
    var onError;
    var next;

    assertiz.addTest = function (test) {
      queue.push(test);
    };

    assertiz.run = function () {
      var test;

      if (!paused && queue.length) {
        test = queue.shift();
        test.run(onFinished, onError);
      }
    };

    onError = function (test) {
      // Publish 'test-error'
      console.log(test);
      next();
    };

    onFinished = function (test) {
      // Publish 'test-finished'
      console.log(test);
      next();
    };

    next = function () {
      paused = false;
      setTimeout(assertiz.run, 1);
    };

    module.$name = 'assertiz';
    module.exports = assertiz;
  });
}());
