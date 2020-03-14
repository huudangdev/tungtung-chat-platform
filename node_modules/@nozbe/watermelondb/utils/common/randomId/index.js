"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.setGenerator = void 0;
// Only numers and letters for human friendliness
var alphabet = '0123456789abcdefghijklmnopqrstuvwxyz';
var alphabetLength = alphabet.length;
var idLength = 16; // Note: for explanation of generating record IDs on the client side, see:
// https://github.com/Nozbe/WatermelonDB/issues/5#issuecomment-442046292

var randomId = function () {
  var id = '';

  for (var i = 0; i < idLength / 2; i += 1) {
    var random = Math.floor(Math.random() * alphabetLength * alphabetLength);
    id += alphabet[Math.floor(random / alphabetLength)];
    id += alphabet[random % alphabetLength];
  }

  return id;
};

var generator = function () {
  return randomId();
};

var setGenerator = function (newGenerator) {
  if ('string' !== typeof newGenerator()) {
    throw new Error('RandomId generator function needs to return a string type.');
  }

  generator = newGenerator;
};

exports.setGenerator = setGenerator;

var _default = function () {
  return generator();
};

exports.default = _default;