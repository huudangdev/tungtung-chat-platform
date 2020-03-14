"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.object.create");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.set-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _native = _interopRequireDefault(require("@emotion/native"));

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Container = (
/*#__PURE__*/
0, _native["default"])(_reactNative.Animated.View)("background:", function (props) {
  return props.theme.backgroundColor;
}, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9wcmV2aWV3L2NvbXBvbmVudHMvT25EZXZpY2VVSS9wYW5lbC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBSzZEIiwiZmlsZSI6Ii4uLy4uLy4uLy4uL3NyYy9wcmV2aWV3L2NvbXBvbmVudHMvT25EZXZpY2VVSS9wYW5lbC50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgUHVyZUNvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFN0eWxlU2hlZXQsIEFuaW1hdGVkIH0gZnJvbSAncmVhY3QtbmF0aXZlJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vbmF0aXZlJztcbmltcG9ydCB7IEVtb3Rpb25Qcm9wcyB9IGZyb20gJy4uL1NoYXJlZC90aGVtZSc7XG5cbmNvbnN0IENvbnRhaW5lcjogdHlwZW9mIEFuaW1hdGVkLlZpZXcgPSBzdHlsZWQoQW5pbWF0ZWQuVmlldylgXG4gIGJhY2tncm91bmQ6ICR7KHByb3BzOiBFbW90aW9uUHJvcHMpID0+IHByb3BzLnRoZW1lLmJhY2tncm91bmRDb2xvcn07XG5gO1xuXG5pbnRlcmZhY2UgUHJvcHMge1xuICBzdHlsZTogYW55W107XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhbmVsIGV4dGVuZHMgUHVyZUNvbXBvbmVudDxQcm9wcz4ge1xuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBjaGlsZHJlbiwgc3R5bGUgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIDxDb250YWluZXIgc3R5bGU9e1tTdHlsZVNoZWV0LmFic29sdXRlRmlsbE9iamVjdCwgLi4uc3R5bGVdfT57Y2hpbGRyZW59PC9Db250YWluZXI+O1xuICB9XG59XG4iXX0= */"));

var Panel =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Panel, _PureComponent);

  function Panel() {
    _classCallCheck(this, Panel);

    return _possibleConstructorReturn(this, _getPrototypeOf(Panel).apply(this, arguments));
  }

  _createClass(Panel, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          style = _this$props.style;
      return _react["default"].createElement(Container, {
        style: [_reactNative.StyleSheet.absoluteFillObject].concat(_toConsumableArray(style))
      }, children);
    }
  }]);

  return Panel;
}(_react.PureComponent);

exports["default"] = Panel;