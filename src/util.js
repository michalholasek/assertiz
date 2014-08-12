(function () {
  'use strict';

  var util = {};

  util.isArray = function (obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
  };

  util.isBoolean = function (value) {
    return typeof value === 'boolean';
  };

  util.isFunction = function (obj) {
    return Object.prototype.toString.call(obj) === '[object Function]';
  };

  util.isString = function (value) {
    return typeof value === 'string';
  };

  if (typeof window !== 'undefined') {
    module.register('./util.js', util);
  } else {
    module.exports = util;
  }
}());
