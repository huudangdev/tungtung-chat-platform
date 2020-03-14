"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toPromise = toPromise;
exports.fromPromise = fromPromise;
exports.mapValue = mapValue;

// lightweight type-only Result (Success(T) | Error) monad
function toPromise(withCallback) {
  return new Promise(function (resolve, reject) {
    withCallback(function (result) {
      if (result.error) {
        reject(result.error);
      } // $FlowFixMe - yes, you do have a value


      resolve(result.value);
    });
  });
}

function fromPromise(promise, callback) {
  promise.then(function (value) {
    return callback({
      value: value
    });
  }, function (error) {
    return callback({
      error: error
    });
  });
}

function mapValue(mapper, result) {
  if (result.error) {
    return result;
  }

  try {
    return {
      value: mapper(result.value)
    };
  } catch (error) {
    return {
      error: error
    };
  }
}