"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = encodeQuery;

var _rambdax = require("rambdax");

var _identical = _interopRequireDefault(require("../../../../utils/fp/identical"));

var _objOf = _interopRequireDefault(require("../../../../utils/fp/objOf"));

var _zip = _interopRequireDefault(require("../../../../utils/fp/zip"));

var _cond = _interopRequireDefault(require("../../../../utils/fp/cond"));

var _invariant = _interopRequireDefault(require("../../../../utils/common/invariant"));

var _likeToRegexp = _interopRequireDefault(require("../../../../utils/fp/likeToRegexp"));

var _Schema = require("../../../../Schema");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-use-before-define */
var getComparisonRight = (0, _cond.default)([[(0, _rambdax.has)('value'), (0, _rambdax.prop)('value')], [(0, _rambdax.has)('values'), (0, _rambdax.prop)('values')], [(0, _rambdax.has)('column'), function () {
  return (0, _invariant.default)(false, 'Column comparisons unimplemented!');
}] // TODO: !!
]); // TODO: It's probably possible to improve performance of those operators by making them
// binary-search compatible (i.e. don't use $and, $not)
// TODO: We might be able to use $jgt, $jbetween, etc. — but ensure the semantics are right
// and it won't break indexing

var weakNotEqual = function (value) {
  return {
    $not: {
      $aeq: value
    }
  };
};

var noNullComparisons = function (operator) {
  return function (value) {
    return {
      $and: [operator(value), weakNotEqual(null)]
    };
  };
};

var like = function (value) {
  if ('string' === typeof value) {
    return {
      $regex: (0, _likeToRegexp.default)(value)
    };
  }

  return {};
};

var notLike = function (value) {
  if ('string' === typeof value) {
    return {
      $and: [{
        $not: {
          $eq: null
        }
      }, {
        $not: {
          $regex: (0, _likeToRegexp.default)(value)
        }
      }]
    };
  }

  return {};
};

var operators = {
  eq: (0, _objOf.default)('$aeq'),
  notEq: weakNotEqual,
  gt: (0, _objOf.default)('$gt'),
  gte: (0, _objOf.default)('$gte'),
  weakGt: (0, _objOf.default)('$gt'),
  // Note: this is correct (at least for as long as column comparisons happens via matchers)
  lt: noNullComparisons((0, _objOf.default)('$lt')),
  lte: noNullComparisons((0, _objOf.default)('$lte')),
  oneOf: (0, _objOf.default)('$in'),
  notIn: noNullComparisons((0, _objOf.default)('$nin')),
  between: (0, _objOf.default)('$between'),
  like: like,
  notLike: notLike
};

var encodeComparison = function ({
  operator: operator,
  right: right
}) {
  var comparisonRight = getComparisonRight(right);

  if ('string' === typeof comparisonRight) {
    // we can do fast path as we know that eq and aeq do the same thing for strings
    if ('eq' === operator) {
      return {
        $eq: comparisonRight
      };
    } else if ('notEq' === operator) {
      return {
        $ne: comparisonRight
      };
    }
  }

  return operators[operator](comparisonRight);
}; // HACK: Can't be `{}` or `undefined`, because that doesn't work with `or` conditions


var hackAlwaysTrueCondition = {
  _fakeAlwaysTrue: {
    $eq: undefined
  }
};

var encodeWhereDescription = function ({
  left: left,
  comparison: comparison
}) {
  return (// HACK: If this is a column comparison condition, ignore it (assume it evaluates to true)
    // The column comparison will actually be performed during the refining pass with a matcher func
    (0, _rambdax.has)('column', comparison.right) ? hackAlwaysTrueCondition : (0, _objOf.default)(left, encodeComparison(comparison))
  );
};

var typeEq = (0, _rambdax.propEq)('type');

var encodeCondition = function (condition) {
  return (0, _cond.default)([[typeEq('and'), encodeAnd], [typeEq('or'), encodeOr], [typeEq('where'), encodeWhereDescription], [typeEq('on'), encodeWhereDescription]])(condition);
};

var encodeAndOr = function (op) {
  return (0, _rambdax.pipe)((0, _rambdax.prop)('conditions'), (0, _rambdax.map)(encodeCondition), (0, _objOf.default)(op));
};

var encodeAnd = encodeAndOr('$and');
var encodeOr = encodeAndOr('$or');

var lengthEq = function (n) {
  return (0, _rambdax.pipe)(_rambdax.length, (0, _identical.default)(n));
}; // Note: empty query returns `undefined` because
// Loki's Collection.count() works but count({}) doesn't


var concatRawQueries = (0, _cond.default)([[lengthEq(0), (0, _rambdax.always)(undefined)], [lengthEq(1), _rambdax.head], [_rambdax.T, (0, _objOf.default)('$and')]]);
var encodeConditions = (0, _rambdax.pipe)(function (conditions) {
  return (0, _rambdax.map)(encodeCondition, conditions);
}, concatRawQueries);
var encodeMapKey = (0, _rambdax.ifElse)((0, _rambdax.propEq)('type', 'belongs_to'), (0, _rambdax.always)((0, _Schema.columnName)('id')), (0, _rambdax.prop)('foreignKey'));
var encodeJoinKey = (0, _rambdax.ifElse)((0, _rambdax.propEq)('type', 'belongs_to'), (0, _rambdax.prop)('key'), (0, _rambdax.always)((0, _Schema.columnName)('id')));
var encodeOriginalConditions = (0, _rambdax.map)(function ({
  left: left,
  comparison: comparison
}) {
  return {
    type: 'where',
    left: left,
    comparison: comparison
  };
});

var encodeJoin = function ([table, associationInfo], conditions) {
  return {
    table: table,
    query: encodeConditions(conditions),
    originalConditions: encodeOriginalConditions(conditions),
    mapKey: encodeMapKey(associationInfo),
    joinKey: encodeJoinKey(associationInfo)
  };
};

var groupByTable = (0, _rambdax.pipe)((0, _rambdax.groupBy)((0, _rambdax.prop)('table')), _rambdax.values);

var zipAssociationsConditions = function (associations, conditions) {
  return (0, _zip.default)(associations, groupByTable(conditions));
};

var encodeJoins = function (associations, on) {
  var conditions = zipAssociationsConditions(associations, on);
  return (0, _rambdax.map)(function ([association, _on]) {
    return encodeJoin(association, _on);
  }, conditions);
};

function encodeQuery(query) {
  var {
    table: table,
    description: {
      where: where,
      join: join
    },
    associations: associations
  } = query;
  return {
    table: table,
    query: encodeConditions(where),
    joins: encodeJoins(associations, join)
  };
}