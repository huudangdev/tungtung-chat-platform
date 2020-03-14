"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.schemaMigrations = schemaMigrations;
exports.createTable = createTable;
exports.addColumns = addColumns;

var _rambdax = require("rambdax");

var _index = require("../index");

var _common = require("../../utils/common");

var _fp = require("../../utils/fp");

var sortMigrations = (0, _rambdax.sortBy)((0, _rambdax.prop)('toVersion')); // Creates a specification of how to migrate between different versions of
// database schema. Every time you change the database schema, you must
// create a corresponding migration.
//
// See docs for more details
//
// Example:
//
// schemaMigrations({
//   migrations: [
//     {
//       toVersion: 3,
//       steps: [
//         createTable({
//           name: 'comments',
//           columns: [
//             { name: 'post_id', type: 'string', isIndexed: true },
//             { name: 'body', type: 'string' },
//           ],
//         }),
//         addColumns({
//           table: 'posts',
//           columns: [
//             { name: 'subtitle', type: 'string', isOptional: true },
//             { name: 'is_pinned', type: 'boolean' },
//           ],
//         }),
//       ],
//     },
//     {
//       toVersion: 2,
//       steps: [
//         // ...
//       ],
//     },
//   ],
// })

function schemaMigrations(migrationSpec) {
  var {
    migrations: migrations
  } = migrationSpec;

  if ('production' !== process.env.NODE_ENV) {
    // validate migrations spec object
    (0, _common.invariant)(Array.isArray(migrations), 'Missing migrations array'); // validate migrations format

    migrations.forEach(function (migration) {
      (0, _common.invariant)((0, _fp.isObject)(migration), "Invalid migration (not an object) in schema migrations");
      var {
        toVersion: toVersion,
        steps: steps
      } = migration;
      (0, _common.invariant)('number' === typeof toVersion, 'Invalid migration - `toVersion` must be a number');
      (0, _common.invariant)(2 <= toVersion, "Invalid migration to version ".concat(toVersion, ". Minimum possible migration version is 2"));
      (0, _common.invariant)(Array.isArray(steps) && steps.every(function (step) {
        return 'string' === typeof step.type;
      }), "Invalid migration steps for migration to version ".concat(toVersion, ". 'steps' should be an array of migration step calls"));
    });
  }

  var sortedMigrations = sortMigrations(migrations);
  var oldestMigration = (0, _rambdax.head)(sortedMigrations);
  var newestMigration = (0, _rambdax.last)(sortedMigrations);
  var minVersion = oldestMigration ? oldestMigration.toVersion - 1 : 1;
  var maxVersion = (null === newestMigration || void 0 === newestMigration ? void 0 : newestMigration.toVersion) || 1;

  if ('production' !== process.env.NODE_ENV) {
    // validate that migration spec is without gaps and duplicates
    sortedMigrations.reduce(function (maxCoveredVersion, migration) {
      var {
        toVersion: toVersion
      } = migration;

      if (maxCoveredVersion) {
        (0, _common.invariant)(toVersion === maxCoveredVersion + 1, "Invalid migrations! Migrations listed cover range from version ".concat(minVersion, " to ").concat(maxCoveredVersion, ", but migration ").concat(JSON.stringify(migration), " is to version ").concat(toVersion, ". Migrations must be listed without gaps, or duplicates."));
      }

      return toVersion;
    }, null);
  }

  return {
    sortedMigrations: sortedMigrations,
    minVersion: minVersion,
    maxVersion: maxVersion,
    validated: true
  };
}

function createTable(tableSchemaSpec) {
  var schema = (0, _index.tableSchema)(tableSchemaSpec);
  return {
    type: 'create_table',
    schema: schema
  };
}

function addColumns({
  table: table,
  columns: columns
}) {
  if ('production' !== process.env.NODE_ENV) {
    (0, _common.invariant)(table, "Missing table name in addColumn()");
    (0, _common.invariant)(columns && Array.isArray(columns), "Missing 'columns' or not an array in addColumn()");
    columns.forEach(function (column) {
      return (0, _index.validateColumnSchema)(column);
    });
  }

  return {
    type: 'add_columns',
    table: table,
    columns: columns
  };
}
/*

TODO: Those types of migrations are currently not implemented. If you need them, feel free to contribute!

// table operations
destroyTable('table_name')
renameTable({ from: 'old_table_name', to: 'new_table_name' })

// column operations
renameColumn({ table: 'table_name', from: 'old_column_name', to: 'new_column_name' })
destroyColumn({ table: 'table_name', column: 'column_name' })

// indexing
addColumnIndex({ table: 'table_name', column: 'column_name' })
removeColumnIndex({ table: 'table_name', column: 'column_name' })

// optionality
makeColumnOptional({ table: 'table_name', column: 'column_name' }) // allows nulls now
makeColumnRequired({ table: 'table_name', column: 'column_name' }) // nulls are changed to null value ('', 0, false)

*/