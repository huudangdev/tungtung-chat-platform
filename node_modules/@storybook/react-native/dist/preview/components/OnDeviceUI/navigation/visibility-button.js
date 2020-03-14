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

var Touchable =
/*#__PURE__*/
_native["default"].TouchableOpacity("background:transparent;position:absolute;right:8;bottom:12;z-index:100;");

var HideIcon =
/*#__PURE__*/
_native["default"].Text("font-size:14;color:", function (props) {
  return props.theme.buttonTextColor;
}, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9wcmV2aWV3L2NvbXBvbmVudHMvT25EZXZpY2VVSS9uYXZpZ2F0aW9uL3Zpc2liaWxpdHktYnV0dG9uLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFpQjRCIiwiZmlsZSI6Ii4uLy4uLy4uLy4uLy4uL3NyYy9wcmV2aWV3L2NvbXBvbmVudHMvT25EZXZpY2VVSS9uYXZpZ2F0aW9uL3Zpc2liaWxpdHktYnV0dG9uLnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBQdXJlQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgVG91Y2hhYmxlT3BhY2l0eSB9IGZyb20gJ3JlYWN0LW5hdGl2ZSc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL25hdGl2ZSc7XG5pbXBvcnQgeyBFbW90aW9uUHJvcHMgfSBmcm9tICcuLi8uLi9TaGFyZWQvdGhlbWUnO1xuXG5pbnRlcmZhY2UgUHJvcHMge1xuICBvblByZXNzOiAoKSA9PiB2b2lkO1xufVxuXG5jb25zdCBUb3VjaGFibGU6IHR5cGVvZiBUb3VjaGFibGVPcGFjaXR5ID0gc3R5bGVkLlRvdWNoYWJsZU9wYWNpdHlgXG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHJpZ2h0OiA4O1xuICBib3R0b206IDEyO1xuICB6LWluZGV4OiAxMDA7XG5gO1xuXG5jb25zdCBIaWRlSWNvbiA9IHN0eWxlZC5UZXh0YFxuICBmb250LXNpemU6IDE0O1xuICBjb2xvcjogJHsocHJvcHM6IEVtb3Rpb25Qcm9wcykgPT4gcHJvcHMudGhlbWUuYnV0dG9uVGV4dENvbG9yfTtcbmA7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpc2liaWxpdHlCdXR0b24gZXh0ZW5kcyBQdXJlQ29tcG9uZW50PFByb3BzPiB7XG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IG9uUHJlc3MgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxUb3VjaGFibGVcbiAgICAgICAgb25QcmVzcz17b25QcmVzc31cbiAgICAgICAgdGVzdElEPVwiU3Rvcnlib29rLk9uRGV2aWNlVUkudG9nZ2xlVUlcIlxuICAgICAgICBhY2Nlc3NpYmlsaXR5TGFiZWw9XCJTdG9yeWJvb2suT25EZXZpY2VVSS50b2dnbGVVSVwiXG4gICAgICAgIGhpdFNsb3A9e3sgdG9wOiA1LCBsZWZ0OiA1LCBib3R0b206IDUsIHJpZ2h0OiA1IH19XG4gICAgICA+XG4gICAgICAgIDxIaWRlSWNvbj7ilqE8L0hpZGVJY29uPlxuICAgICAgPC9Ub3VjaGFibGU+XG4gICAgKTtcbiAgfVxufVxuIl19 */"));

var VisibilityButton =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(VisibilityButton, _PureComponent);

  function VisibilityButton() {
    _classCallCheck(this, VisibilityButton);

    return _possibleConstructorReturn(this, _getPrototypeOf(VisibilityButton).apply(this, arguments));
  }

  _createClass(VisibilityButton, [{
    key: "render",
    value: function render() {
      var onPress = this.props.onPress;
      return _react["default"].createElement(Touchable, {
        onPress: onPress,
        testID: "Storybook.OnDeviceUI.toggleUI",
        accessibilityLabel: "Storybook.OnDeviceUI.toggleUI",
        hitSlop: {
          top: 5,
          left: 5,
          bottom: 5,
          right: 5
        }
      }, _react["default"].createElement(HideIcon, null, "\u25A1"));
    }
  }]);

  return VisibilityButton;
}(_react.PureComponent);

exports["default"] = VisibilityButton;