(function () {
  'use strict';

  var assertiz = require('./assertiz.js');
  var flat = require('flat');
  
  flat.init(assertiz);
  assertiz.run();
}());
