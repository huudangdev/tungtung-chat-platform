"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateAdapter = validateAdapter;
exports.sanitizeFindResult = sanitizeFindResult;
exports.sanitizeQueryResult = sanitizeQueryResult;
exports.devSetupCallback = devSetupCallback;

var _common = require("../utils/common");

var _RawRecord = require("../RawRecord");

function validateAdapter(adapter) {
  if ('production' !== process.env.NODE_ENV) {
    var {
      schema: schema,
      migrations: migrations
    } = adapter; // TODO: uncomment when full migrations are shipped
    // invariant(migrations, `Missing migrations`)

    if (migrations) {
      (0, _common.invariant)(migrations.validated, "Invalid migrations - use schemaMigrations() to create migrations. See docs for more details.");
      var {
        minVersion: minVersion,
        maxVersion: maxVersion
      } = migrations;
      (0, _common.invariant)(maxVersion <= schema.version, "Migrations can't be newer than schema. Schema is version ".concat(schema.version, " and migrations cover range from ").concat(minVersion, " to ").concat(maxVersion));
      (0, _common.invariant)(maxVersion === schema.version, "Missing migration. Database schema is currently at version ".concat(schema.version, ", but migrations only cover range from ").concat(minVersion, " to ").concat(maxVersion));
    }
  }
}

function sanitizeFindResult(dirtyRecord, tableSchema) {
  return dirtyRecord && 'object' === typeof dirtyRecord ? (0, _RawRecord.sanitizedRaw)(dirtyRecord, tableSchema) : dirtyRecord;
}

function sanitizeQueryResult(dirtyRecords, tableSchema) {
  return dirtyRecords.map(function (dirtyRecord) {
    return 'string' === typeof dirtyRecord ? dirtyRecord : (0, _RawRecord.sanitizedRaw)(dirtyRecord, tableSchema);
  });
}

function devSetupCallback(result) {
  if (result.error) {
    _common.logger.error("[WatermelonDB] Uh-oh. Database failed to load, we're in big trouble. This might happen if you didn't set up native code correctly (iOS, Android), or if you didn't recompile native app after WatermelonDB update. It might also mean that IndexedDB or SQLite refused to open.", result.error);
  }
}