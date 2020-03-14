"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.eq = eq;
exports.notEq = notEq;
exports.gt = gt;
exports.gte = gte;
exports.weakGt = weakGt;
exports.lt = lt;
exports.lte = lte;
exports.oneOf = oneOf;
exports.notIn = notIn;
exports.between = between;
exports.like = like;
exports.notLike = notLike;
exports.sanitizeLikeString = sanitizeLikeString;
exports.column = column;
exports.where = where;
exports.and = and;
exports.or = or;
exports.buildQueryDescription = buildQueryDescription;
exports.queryWithoutDeleted = queryWithoutDeleted;
exports.hasColumnComparisons = hasColumnComparisons;
exports.on = void 0;

var _rambdax = require("rambdax");

var _partition = _interopRequireDefault(require("../utils/fp/partition"));

var _invariant = _interopRequireDefault(require("../utils/common/invariant"));

var _Schema = require("../Schema");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || "[object Arguments]" === Object.prototype.toString.call(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

// Note: These operators are designed to match SQLite semantics
// to ensure that iOS, Android, web, and Query observation yield exactly the same results
//
// - `true` and `false` are equal to `1` and `0`
//   (JS uses true/false, but SQLite uses 1/0)
// - `null`, `undefined`, and missing fields are equal
//   (SQLite queries return null, but newly created records might lack fields)
// - You can only compare columns to values/other columns of the same type
//   (e.g. string to int comparisons are not allowed)
// - numeric comparisons (<, <=, >, >=, between) with null on either side always return false
//   e.g. `null < 2 == false`
// - `null` on the right-hand-side of IN/NOT IN is not allowed
//   e.g. `Q.in([null, 'foo', 'bar'])`
// - `null` on the left-hand-side of IN/NOT IN will always return false
//   e.g. `null NOT IN (1, 2, 3) == false`
function _valueOrColumn(arg) {
  if (null !== arg && 'object' === typeof arg) {
    return arg;
  }

  return {
    value: arg
  };
} // Equals (weakly)
// Note:
// - (null == undefined) == true
// - (1 == true) == true
// - (0 == false) == true


function eq(valueOrColumn) {
  return {
    operator: 'eq',
    right: _valueOrColumn(valueOrColumn)
  };
} // Not equal (weakly)
// Note:
// - (null != undefined) == false
// - (1 != true) == false
// - (0 != false) == false


function notEq(valueOrColumn) {
  return {
    operator: 'notEq',
    right: _valueOrColumn(valueOrColumn)
  };
} // Greater than (SQLite semantics)
// Note:
// - (5 > null) == false


function gt(valueOrColumn) {
  return {
    operator: 'gt',
    right: _valueOrColumn(valueOrColumn)
  };
} // Greater than or equal (SQLite semantics)
// Note:
// - (5 >= null) == false


function gte(valueOrColumn) {
  return {
    operator: 'gte',
    right: _valueOrColumn(valueOrColumn)
  };
} // Greater than (JavaScript semantics)
// Note:
// - (5 > null) == true


function weakGt(valueOrColumn) {
  return {
    operator: 'weakGt',
    right: _valueOrColumn(valueOrColumn)
  };
} // Less than (SQLite semantics)
// Note:
// - (null < 5) == false


function lt(valueOrColumn) {
  return {
    operator: 'lt',
    right: _valueOrColumn(valueOrColumn)
  };
} // Less than or equal (SQLite semantics)
// Note:
// - (null <= 5) == false


function lte(valueOrColumn) {
  return {
    operator: 'lte',
    right: _valueOrColumn(valueOrColumn)
  };
} // Value in a set (SQLite IN semantics)
// Note:
// - `null` in `values` is not allowed!


function oneOf(values) {
  if ('production' !== process.env.NODE_ENV) {
    (0, _invariant.default)(Array.isArray(values), "argument passed to oneOf() is not an array");
  }

  return {
    operator: 'oneOf',
    right: {
      values: values
    }
  };
} // Value not in a set (SQLite NOT IN semantics)
// Note:
// - `null` in `values` is not allowed!
// - (null NOT IN (1, 2, 3)) == false


function notIn(values) {
  if ('production' !== process.env.NODE_ENV) {
    (0, _invariant.default)(Array.isArray(values), "argument passed to notIn() is not an array");
  }

  return {
    operator: 'notIn',
    right: {
      values: values
    }
  };
} // Number is between two numbers (greater than or equal left, and less than or equal right)


function between(left, right) {
  return {
    operator: 'between',
    right: {
      values: [left, right]
    }
  };
}

function like(value) {
  return {
    operator: 'like',
    right: {
      value: value
    }
  };
}

function notLike(value) {
  return {
    operator: 'notLike',
    right: {
      value: value
    }
  };
}

var nonLikeSafeRegexp = /[^a-zA-Z0-9]/g;

function sanitizeLikeString(value) {
  return value.replace(nonLikeSafeRegexp, '_');
}

function column(name) {
  return {
    column: name
  };
}

function _valueOrComparison(arg) {
  if (null !== arg && 'object' === typeof arg) {
    return arg;
  }

  return eq(arg);
}

function where(left, valueOrComparison) {
  return {
    type: 'where',
    left: left,
    comparison: _valueOrComparison(valueOrComparison)
  };
}

function and(...conditions) {
  return {
    type: 'and',
    conditions: conditions
  };
}

function or(...conditions) {
  return {
    type: 'or',
    conditions: conditions
  };
} // Note: we have to write out three separate meanings of OnFunction because of a Babel bug
// (it will remove the parentheses, changing the meaning of the flow type)


// Use: on('tableName', 'left_column', 'right_value')
// or: on('tableName', 'left_column', gte(10))
// or: on('tableName', where('left_column', 'value')))
var on = function (table, leftOrWhereDescription, valueOrComparison) {
  if ('string' === typeof leftOrWhereDescription) {
    (0, _invariant.default)(valueOrComparison !== undefined, 'illegal `undefined` passed to Q.on');
    return {
      type: 'on',
      table: table,
      left: leftOrWhereDescription,
      comparison: _valueOrComparison(valueOrComparison)
    };
  }

  var whereDescription = leftOrWhereDescription;
  return {
    type: 'on',
    table: table,
    left: whereDescription.left,
    comparison: whereDescription.comparison
  };
};

exports.on = on;
var syncStatusColumn = (0, _Schema.columnName)('_status');
var getJoins = (0, _partition.default)((0, _rambdax.propEq)('type', 'on'));
var whereNotDeleted = where(syncStatusColumn, notEq('deleted'));
var joinsWithoutDeleted = (0, _rambdax.pipe)((0, _rambdax.map)((0, _rambdax.prop)('table')), _rambdax.uniq, (0, _rambdax.map)(function (table) {
  return on(table, syncStatusColumn, notEq('deleted'));
}));

function buildQueryDescription(conditions) {
  var [join, whereConditions] = getJoins(conditions);
  var query = {
    join: join,
    where: whereConditions
  };

  if ('production' !== process.env.NODE_ENV) {
    Object.freeze(query);
  }

  return query;
}

function queryWithoutDeleted(query) {
  var {
    join: join,
    where: whereConditions
  } = query;
  var newQuery = {
    join: [].concat(_toConsumableArray(join), _toConsumableArray(joinsWithoutDeleted(join))),
    where: [].concat(_toConsumableArray(whereConditions), [whereNotDeleted])
  };

  if ('production' !== process.env.NODE_ENV) {
    Object.freeze(newQuery);
  }

  return newQuery;
}

var searchForColumnComparisons = function (value) {
  // Performance critical (100ms on login in previous rambdax-based implementation)
  if (Array.isArray(value)) {
    // dig deeper into the array
    for (var i = 0; i < value.length; i += 1) {
      if (searchForColumnComparisons(value[i])) {
        return true;
      }
    }

    return false;
  } else if (value && 'object' === typeof value) {
    if (value.column) {
      return true; // bingo!
    } // drill deeper into the object
    // eslint-disable-next-line no-restricted-syntax


    for (var key in value) {
      // NOTE: To be safe against JS edge cases, there should be hasOwnProperty check
      // but this is performance critical so we trust that this is only called with
      // QueryDescription which doesn't need that
      if (searchForColumnComparisons(value[key])) {
        return true;
      }
    }

    return false;
  } // primitive value


  return false;
};

function hasColumnComparisons(conditions) {
  return searchForColumnComparisons(conditions);
}