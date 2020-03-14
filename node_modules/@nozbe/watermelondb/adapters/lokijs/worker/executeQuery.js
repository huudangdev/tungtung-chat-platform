"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = executeQuery;

var _lokijs = _interopRequireDefault(require("lokijs"));

var _encodeMatcher = _interopRequireDefault(require("../../../observation/encodeMatcher"));

var _QueryDescription = require("../../../QueryDescription");

var _encodeQuery = _interopRequireDefault(require("./encodeQuery"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || "[object Arguments]" === Object.prototype.toString.call(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function refineResultsForColumnComparisons(roughResults, conditions) {
  if ((0, _QueryDescription.hasColumnComparisons)(conditions)) {
    // ignore JOINs (already checked and encodeMatcher can't check it)
    var matcher = (0, _encodeMatcher.default)({
      where: conditions,
      join: []
    });
    return roughResults.where(matcher);
  }

  return roughResults;
} // Finds IDs of matching records on foreign table


function performJoin(join, loki) {
  var _ref;

  var {
    table: table,
    query: query,
    originalConditions: originalConditions,
    mapKey: mapKey,
    joinKey: joinKey
  } = join; // for queries on `belongs_to` tables, matchingIds will be IDs of the parent table records
  //   (e.g. task: { project_id in ids })
  // and for `has_many` tables, it will be IDs of the main table records
  //   (e.g. task: { id in (ids from tag_assignment.task_id) })

  var collection = loki.getCollection(table).chain();
  var roughRecords = collection.find(query); // See executeQuery for explanation of column comparison workaround

  var refinedRecords = refineResultsForColumnComparisons(roughRecords, originalConditions);
  var matchingIds = refinedRecords.data().map(function (record) {
    return record[mapKey];
  });
  return _ref = {}, _ref[joinKey] = {
    $in: matchingIds
  }, _ref;
}

function performJoinsGetQuery(lokiQuery, loki) {
  var {
    query: query,
    joins: joins
  } = lokiQuery;
  var joinConditions = joins.map(function (join) {
    return performJoin(join, loki);
  });
  return joinConditions.length ? {
    $and: [].concat(_toConsumableArray(joinConditions), [query])
  } : query;
} // Note: Loki currently doesn't support column comparisons in its query syntax, so for queries
// that need them, we filter records with a matcher function.
// This is far less efficient, so should be considered a temporary hack/workaround


function executeQuery(query, loki) {
  var collection = loki.getCollection(query.table).chain(); // Step one: fetch all records matching query (and consider `on` conditions)
  // Ignore column comparison conditions (assume condition is true)

  var lokiQuery = (0, _encodeQuery.default)(query);
  var roughResults = collection.find(performJoinsGetQuery(lokiQuery, loki)); // Step two: if query makes column comparison conditions, we (inefficiently) refine
  // the rough results using a matcher function
  // Matcher ignores `on` conditions, so it's not possible to use column comparison in an `on`

  var result = refineResultsForColumnComparisons(roughResults, query.description.where);
  return result;
}