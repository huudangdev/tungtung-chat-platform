"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = encodeMatcher;

var _rambdax = require("rambdax");

var _invariant = _interopRequireDefault(require("../../utils/common/invariant"));

var _operators = _interopRequireDefault(require("./operators"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-use-before-define */
var encodeWhereDescription = function (description) {
  return function (rawRecord) {
    var left = rawRecord[description.left];
    var {
      comparison: comparison
    } = description;
    var operator = _operators.default[comparison.operator];
    var compRight = comparison.right;
    var right; // TODO: What about `undefined`s ?

    if (compRight.value !== undefined) {
      right = compRight.value;
    } else if (compRight.values) {
      right = compRight.values;
    } else if (compRight.column) {
      right = rawRecord[compRight.column];
    } else {
      throw new Error('Invalid comparisonRight');
    }

    return operator(left, right);
  };
};

var encodeWhere = function (where) {
  switch (where.type) {
    case 'where':
      return encodeWhereDescription(where);

    case 'and':
      return (0, _rambdax.allPass)(where.conditions.map(encodeWhere));

    case 'or':
      return (0, _rambdax.anyPass)(where.conditions.map(encodeWhere));

    default:
      throw new Error('Invalid Where');
  }
};

var encodeConditions = (0, _rambdax.pipe)((0, _rambdax.map)(encodeWhere), _rambdax.allPass);

function encodeMatcher(query) {
  var {
    join: join,
    where: where
  } = query;
  (0, _invariant.default)(!join.length, "Queries with joins can't be encoded into a matcher");
  return encodeConditions(where);
}