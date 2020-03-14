"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureDecoratorUsedProperly = ensureDecoratorUsedProperly;

var _is = _interopRequireDefault(require("../utils/fp/is"));

var _invariant = _interopRequireDefault(require("../utils/common/invariant"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ensureDecoratorUsedProperly(columnName, target, key, descriptor) {
  (0, _invariant.default)(columnName, "Pass column name (raw field name) to the decorator - error in ".concat(target.constructor.name, ".prototype.").concat(key, " given."));

  if (descriptor) {
    (0, _invariant.default)('initializer' in descriptor, "Model field decorators can only be used for simple properties - method, setter or getter ".concat(target.constructor.name, ".prototype.").concat(key, " given."));
    (0, _invariant.default)(!(0, _is.default)(Function, descriptor.initializer), "Model field decorators must not be used on properties with a default value - error in \"".concat(target.constructor.name, ".prototype.").concat(key, "\"."));
  }
}