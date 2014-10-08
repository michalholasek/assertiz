(function () {
  'use strict';

  module('utils', function () {
    var utils = {};

    utils.isArray = function (obj) {
      return Object.prototype.toString.call(obj) === '[object Array]';
    };

    utils.isFunction = function (obj) {
      return Object.prototype.toString.call(obj) === '[object Function]';
    };

    utils.isString = function (value) {
      return typeof value === 'string';
    };

    module.exports = utils;
  });
}());
