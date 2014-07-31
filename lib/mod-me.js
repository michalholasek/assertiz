(function () {
  'use strict';

  var defined = {};
  var isFunction;
  var addModule;
  var isString;
  var isArray;
  var require;
  var module;
  var clear;

  addModule = function (name) {
    if (!defined[name]) {
      defined[name] = module.exports;
    } else {
      throw new Error('module ' + name + ' already exists');
    }
  };

  clear = function () {
    delete module.exports;
  };

  isArray = function (obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
  };

  isFunction = function (obj) {
    return Object.prototype.toString.call(obj) === '[object Function]';
  };

  isString = function (value) {
    return typeof value === 'string';
  };

  module = function (name, fn) {
    if (name && isString(name) && fn && isFunction(fn)) {
      fn();
      addModule(name);
      clear();
    }
  };

  require = function (name) {
    if (name && isString(name)) {
      if (defined[name]) {
        return defined[name];
      } else {
        throw new Error('module ' + name + ' was not defined');
      }
    } else {
      throw new Error('module name is not a string');
    }
  };
 
  window.isFunction = isFunction;
  window.isString = isString;
  window.isArray = isArray;
  
  window.require = require;
  window.module = module;
}());
