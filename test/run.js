(function () {
  'use strict';

  var assertiz = require('assertiz');

  assertiz.on('test-finished', function (test) {
    console.log(test);
  });

  assertiz.on('test-error', function (test) {
    console.log(test);
  });

  assertiz.run();
}());
