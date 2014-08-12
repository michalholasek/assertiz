(function () {
  'use strict';

  var global = window !== undefined ? window : global;

  global.isArray = function (obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
  };

  global.isBoolean = function (value) {
    return typeof value === 'boolean';
  };

  global.isFunction = function (obj) {
    return Object.prototype.toString.call(obj) === '[object Function]';
  };

  global.isString = function (value) {
    return typeof value === 'string';
  };

  global.isUndefined = function (value) {
    return value === undefined;
  };
}());
