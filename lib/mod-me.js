(function () {
  'use strict';

  var defined = {};
  var module = {};
  var require;

  module.register = function (name, mod) {
    if (name && typeof name === 'string' && mod) {
      if (!defined[name]) {
        defined[name] = mod;
      } else {
        throw new Error('module ' + name + ' already exists');
      }
    }
  };

  require = function (name) {
    if (name && typeof name === 'string') {
      if (defined[name]) {
        return defined[name];
      } else {
        throw new Error('module ' + name + ' was not defined');
      }
    } else {
      throw new Error('module name is not a string');
    }
  };

  if (typeof window !== 'undefined') {
    window.require = require;
    window.module = module;  
  }
}());
