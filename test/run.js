(function () {
  'use strict';

  var assertiz = require('assertiz');
  var flat = require('flat');
  
  flat.init(assertiz);
  assertiz.run();
}());
