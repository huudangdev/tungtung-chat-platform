"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

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

var _reactNative = require("react-native");

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

var ActiveBorder =
/*#__PURE__*/
_native["default"].View("background:", function (props) {
  return props.active ? props.theme.borderColor : 'transparent';
}, ";height:3;" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9wcmV2aWV3L2NvbXBvbmVudHMvT25EZXZpY2VVSS9uYXZpZ2F0aW9uL2J1dHRvbi50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBT2dDIiwiZmlsZSI6Ii4uLy4uLy4uLy4uLy4uL3NyYy9wcmV2aWV3L2NvbXBvbmVudHMvT25EZXZpY2VVSS9uYXZpZ2F0aW9uL2J1dHRvbi50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgUHVyZUNvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFRvdWNoYWJsZU9wYWNpdHkgfSBmcm9tICdyZWFjdC1uYXRpdmUnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9uYXRpdmUnO1xuaW1wb3J0IHsgRW1vdGlvblByb3BzIH0gZnJvbSAnLi4vLi4vU2hhcmVkL3RoZW1lJztcblxudHlwZSBFbW90aW9uQnV0dG9uUHJvcHMgPSBFbW90aW9uUHJvcHMgJiB7IGFjdGl2ZTogYm9vbGVhbiB9O1xuXG5jb25zdCBBY3RpdmVCb3JkZXIgPSBzdHlsZWQuVmlld2BcbiAgYmFja2dyb3VuZDogJHsocHJvcHM6IEVtb3Rpb25CdXR0b25Qcm9wcykgPT5cbiAgICBwcm9wcy5hY3RpdmUgPyBwcm9wcy50aGVtZS5ib3JkZXJDb2xvciA6ICd0cmFuc3BhcmVudCd9O1xuICBoZWlnaHQ6IDM7XG5gO1xuXG5jb25zdCBCdXR0b25UZXh0ID0gc3R5bGVkLlRleHRgXG4gIGNvbG9yOiAkeyhwcm9wczogRW1vdGlvbkJ1dHRvblByb3BzKSA9PlxuICAgIHByb3BzLmFjdGl2ZSA/IHByb3BzLnRoZW1lLmJ1dHRvbkFjdGl2ZVRleHRDb2xvciA6IHByb3BzLnRoZW1lLmJ1dHRvblRleHRDb2xvcn07XG4gIHBhZGRpbmctaG9yaXpvbnRhbDogODtcbiAgcGFkZGluZy12ZXJ0aWNhbDogMTA7XG4gIGZvbnQtc2l6ZTogMTE7XG5gO1xuXG5pbnRlcmZhY2UgUHJvcHMge1xuICBpZDogbnVtYmVyIHwgc3RyaW5nO1xuICBhY3RpdmU6IGJvb2xlYW47XG4gIG9uUHJlc3M6IChpZDogbnVtYmVyIHwgc3RyaW5nKSA9PiB2b2lkO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCdXR0b24gZXh0ZW5kcyBQdXJlQ29tcG9uZW50PFByb3BzPiB7XG4gIG9uUHJlc3MgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBvblByZXNzLCBpZCB9ID0gdGhpcy5wcm9wcztcbiAgICBvblByZXNzKGlkKTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBhY3RpdmUsIGNoaWxkcmVuIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxUb3VjaGFibGVPcGFjaXR5IG9uUHJlc3M9e3RoaXMub25QcmVzc30gYWN0aXZlT3BhY2l0eT17MC44fT5cbiAgICAgICAgPEJ1dHRvblRleHQgYWN0aXZlPXthY3RpdmV9PntjaGlsZHJlbn08L0J1dHRvblRleHQ+XG4gICAgICAgIDxBY3RpdmVCb3JkZXIgYWN0aXZlPXthY3RpdmV9IC8+XG4gICAgICA8L1RvdWNoYWJsZU9wYWNpdHk+XG4gICAgKTtcbiAgfVxufVxuIl19 */"));

var ButtonText =
/*#__PURE__*/
_native["default"].Text("color:", function (props) {
  return props.active ? props.theme.buttonActiveTextColor : props.theme.buttonTextColor;
}, ";padding-horizontal:8;padding-vertical:10;font-size:11;" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9wcmV2aWV3L2NvbXBvbmVudHMvT25EZXZpY2VVSS9uYXZpZ2F0aW9uL2J1dHRvbi50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBYThCIiwiZmlsZSI6Ii4uLy4uLy4uLy4uLy4uL3NyYy9wcmV2aWV3L2NvbXBvbmVudHMvT25EZXZpY2VVSS9uYXZpZ2F0aW9uL2J1dHRvbi50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgUHVyZUNvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFRvdWNoYWJsZU9wYWNpdHkgfSBmcm9tICdyZWFjdC1uYXRpdmUnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9uYXRpdmUnO1xuaW1wb3J0IHsgRW1vdGlvblByb3BzIH0gZnJvbSAnLi4vLi4vU2hhcmVkL3RoZW1lJztcblxudHlwZSBFbW90aW9uQnV0dG9uUHJvcHMgPSBFbW90aW9uUHJvcHMgJiB7IGFjdGl2ZTogYm9vbGVhbiB9O1xuXG5jb25zdCBBY3RpdmVCb3JkZXIgPSBzdHlsZWQuVmlld2BcbiAgYmFja2dyb3VuZDogJHsocHJvcHM6IEVtb3Rpb25CdXR0b25Qcm9wcykgPT5cbiAgICBwcm9wcy5hY3RpdmUgPyBwcm9wcy50aGVtZS5ib3JkZXJDb2xvciA6ICd0cmFuc3BhcmVudCd9O1xuICBoZWlnaHQ6IDM7XG5gO1xuXG5jb25zdCBCdXR0b25UZXh0ID0gc3R5bGVkLlRleHRgXG4gIGNvbG9yOiAkeyhwcm9wczogRW1vdGlvbkJ1dHRvblByb3BzKSA9PlxuICAgIHByb3BzLmFjdGl2ZSA/IHByb3BzLnRoZW1lLmJ1dHRvbkFjdGl2ZVRleHRDb2xvciA6IHByb3BzLnRoZW1lLmJ1dHRvblRleHRDb2xvcn07XG4gIHBhZGRpbmctaG9yaXpvbnRhbDogODtcbiAgcGFkZGluZy12ZXJ0aWNhbDogMTA7XG4gIGZvbnQtc2l6ZTogMTE7XG5gO1xuXG5pbnRlcmZhY2UgUHJvcHMge1xuICBpZDogbnVtYmVyIHwgc3RyaW5nO1xuICBhY3RpdmU6IGJvb2xlYW47XG4gIG9uUHJlc3M6IChpZDogbnVtYmVyIHwgc3RyaW5nKSA9PiB2b2lkO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCdXR0b24gZXh0ZW5kcyBQdXJlQ29tcG9uZW50PFByb3BzPiB7XG4gIG9uUHJlc3MgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBvblByZXNzLCBpZCB9ID0gdGhpcy5wcm9wcztcbiAgICBvblByZXNzKGlkKTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBhY3RpdmUsIGNoaWxkcmVuIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxUb3VjaGFibGVPcGFjaXR5IG9uUHJlc3M9e3RoaXMub25QcmVzc30gYWN0aXZlT3BhY2l0eT17MC44fT5cbiAgICAgICAgPEJ1dHRvblRleHQgYWN0aXZlPXthY3RpdmV9PntjaGlsZHJlbn08L0J1dHRvblRleHQ+XG4gICAgICAgIDxBY3RpdmVCb3JkZXIgYWN0aXZlPXthY3RpdmV9IC8+XG4gICAgICA8L1RvdWNoYWJsZU9wYWNpdHk+XG4gICAgKTtcbiAgfVxufVxuIl19 */"));

var Button =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Button, _PureComponent);

  function Button() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Button);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Button)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.onPress = function () {
      var _this$props = _this.props,
          onPress = _this$props.onPress,
          id = _this$props.id;
      onPress(id);
    };

    return _this;
  }

  _createClass(Button, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          active = _this$props2.active,
          children = _this$props2.children;
      return _react["default"].createElement(_reactNative.TouchableOpacity, {
        onPress: this.onPress,
        activeOpacity: 0.8
      }, _react["default"].createElement(ButtonText, {
        active: active
      }, children), _react["default"].createElement(ActiveBorder, {
        active: active
      }));
    }
  }]);

  return Button;
}(_react.PureComponent);

exports["default"] = Button;