"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stepsForMigration = stepsForMigration;

var _rambdax = require("rambdax");

var _fp = require("../../utils/fp");

var getAllSteps = (0, _rambdax.pipe)((0, _rambdax.map)((0, _rambdax.prop)('steps')), _fp.unnest);

function stepsForMigration({
  migrations: schemaMigrations,
  fromVersion: fromVersion,
  toVersion: toVersion
}) {
  var {
    sortedMigrations: sortedMigrations,
    minVersion: minVersion,
    maxVersion: maxVersion
  } = schemaMigrations; // see if migrations in this range are available

  if (fromVersion < minVersion || toVersion > maxVersion) {
    return null;
  } // return steps


  var matchingMigrations = sortedMigrations.filter(function ({
    toVersion: version
  }) {
    return version > fromVersion && version <= toVersion;
  });
  return getAllSteps(matchingMigrations);
}