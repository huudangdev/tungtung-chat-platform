"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.object.create");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.set-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _native = _interopRequireDefault(require("@emotion/native"));

var _react = _interopRequireWildcard(require("react"));

var _button = _interopRequireDefault(require("./button"));

var _constants = require("./constants");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Container =
/*#__PURE__*/
_native["default"].View("flex-direction:row;padding-horizontal:8;background:", function (props) {
  return props.theme.backgroundColor;
}, ";border-top-width:1;border-bottom-width:1;border-color:", function (props) {
  return props.theme.borderColor;
}, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9wcmV2aWV3L2NvbXBvbmVudHMvT25EZXZpY2VVSS9uYXZpZ2F0aW9uL2Jhci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBTTZCIiwiZmlsZSI6Ii4uLy4uLy4uLy4uLy4uL3NyYy9wcmV2aWV3L2NvbXBvbmVudHMvT25EZXZpY2VVSS9uYXZpZ2F0aW9uL2Jhci50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgUHVyZUNvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vbmF0aXZlJztcbmltcG9ydCBCdXR0b24gZnJvbSAnLi9idXR0b24nO1xuaW1wb3J0IHsgTkFWSUdBVE9SLCBQUkVWSUVXLCBBRERPTlMgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBFbW90aW9uUHJvcHMgfSBmcm9tICcuLi8uLi9TaGFyZWQvdGhlbWUnO1xuXG5jb25zdCBDb250YWluZXIgPSBzdHlsZWQuVmlld2BcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgcGFkZGluZy1ob3Jpem9udGFsOiA4O1xuICBiYWNrZ3JvdW5kOiAkeyhwcm9wczogRW1vdGlvblByb3BzKSA9PiBwcm9wcy50aGVtZS5iYWNrZ3JvdW5kQ29sb3J9O1xuICBib3JkZXItdG9wLXdpZHRoOiAxO1xuICBib3JkZXItYm90dG9tLXdpZHRoOiAxO1xuICBib3JkZXItY29sb3I6ICR7KHByb3BzOiBFbW90aW9uUHJvcHMpID0+IHByb3BzLnRoZW1lLmJvcmRlckNvbG9yfTtcbmA7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJvcHMge1xuICBpbmRleDogbnVtYmVyO1xuICBvblByZXNzOiAoaWQ6IG51bWJlcikgPT4gdm9pZDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFyIGV4dGVuZHMgUHVyZUNvbXBvbmVudDxQcm9wcz4ge1xuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBpbmRleCwgb25QcmVzcyB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPENvbnRhaW5lcj5cbiAgICAgICAgPEJ1dHRvbiBvblByZXNzPXtvblByZXNzfSBpZD17TkFWSUdBVE9SfSBhY3RpdmU9e2luZGV4ID09PSBOQVZJR0FUT1J9PlxuICAgICAgICAgIE5BVklHQVRPUlxuICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgPEJ1dHRvbiBvblByZXNzPXtvblByZXNzfSBpZD17UFJFVklFV30gYWN0aXZlPXtpbmRleCA9PT0gUFJFVklFV30+XG4gICAgICAgICAgUFJFVklFV1xuICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgPEJ1dHRvbiBvblByZXNzPXtvblByZXNzfSBpZD17QURET05TfSBhY3RpdmU9e2luZGV4ID09PSBBRERPTlN9PlxuICAgICAgICAgIEFERE9OU1xuICAgICAgICA8L0J1dHRvbj5cbiAgICAgIDwvQ29udGFpbmVyPlxuICAgICk7XG4gIH1cbn1cbiJdfQ== */"));

var Bar =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Bar, _PureComponent);

  function Bar() {
    _classCallCheck(this, Bar);

    return _possibleConstructorReturn(this, _getPrototypeOf(Bar).apply(this, arguments));
  }

  _createClass(Bar, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          index = _this$props.index,
          onPress = _this$props.onPress;
      return _react["default"].createElement(Container, null, _react["default"].createElement(_button["default"], {
        onPress: onPress,
        id: _constants.NAVIGATOR,
        active: index === _constants.NAVIGATOR
      }, "NAVIGATOR"), _react["default"].createElement(_button["default"], {
        onPress: onPress,
        id: _constants.PREVIEW,
        active: index === _constants.PREVIEW
      }, "PREVIEW"), _react["default"].createElement(_button["default"], {
        onPress: onPress,
        id: _constants.ADDONS,
        active: index === _constants.ADDONS
      }, "ADDONS"));
    }
  }]);

  return Bar;
}(_react.PureComponent);

exports["default"] = Bar;