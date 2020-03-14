"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addToRawSet = addToRawSet;
exports.setRawColumnChange = setRawColumnChange;

function addToRawSet(rawSet, value) {
  var array = rawSet ? rawSet.split(',') : [];
  var set = new Set(array);
  set.add(value);
  return Array.from(set).join(',');
} // Mutates `rawRecord` to mark `columName` as modified for sync purposes


function setRawColumnChange(rawRecord, columnName) {
  if ('created' !== rawRecord._status) {
    rawRecord._changed = addToRawSet(rawRecord._changed, columnName);
    rawRecord._status = 'updated';
  }
}