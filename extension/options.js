(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _utils = require('./utils');

// Restores state using the preferences stored in chrome.storage.
function restoreOptions() {
  chrome.storage.sync.get({
    messageColor: true
  }, function (items) {
    if (items.messageColor) {
      (0, _utils.querySelector)('#message-color').parentNode.MaterialSwitch.on();
    } else {
      (0, _utils.querySelector)('#message-color').parentNode.MaterialSwitch.off();
    }
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
// $('#save').addEventListener('click', saveOptions);
(0, _utils.querySelector)('#message-color').addEventListener('change', function (e) {
  chrome.storage.sync.set({
    messageColor: e.target.checked
  });
});

},{"./utils":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var querySelector = document.querySelector.bind(document);
var querySelectorAll = document.querySelectorAll.bind(document);
exports.querySelector = querySelector;
exports.querySelectorAll = querySelectorAll;

},{}]},{},[1]);
