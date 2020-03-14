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

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// Android changes screen size when keyboard opens.
// To avoid issues we use absolute positioned element with predefined screen size
var AbsolutePositionedKeyboardAwareView =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(AbsolutePositionedKeyboardAwareView, _PureComponent);

  function AbsolutePositionedKeyboardAwareView() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, AbsolutePositionedKeyboardAwareView);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(AbsolutePositionedKeyboardAwareView)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.keyboardDidShowListener = void 0;
    _this.keyboardDidHideListener = void 0;
    _this.keyboardOpen = void 0;

    _this.keyboardDidShowHandler = function (e) {
      if (_reactNative.Platform.OS === 'android') {
        var previewWidth = _this.props.previewWidth; // There is bug in RN android that keyboardDidShow event is called simply when you go from portrait to landscape.
        // To make sure that this is keyboard event we check screen width

        if (previewWidth === e.endCoordinates.width) {
          _this.keyboardOpen = true;
        }
      }
    };

    _this.removeKeyboardOnOrientationChange = function () {
      if (_reactNative.Platform.OS === 'android') {
        _this.keyboardOpen = false;
      }
    };

    _this.keyboardDidHideHandler = function () {
      if (_this.keyboardOpen) {
        _this.keyboardOpen = false;
      }
    };

    _this.onLayoutHandler = function (_ref) {
      var nativeEvent = _ref.nativeEvent;

      if (!_this.keyboardOpen) {
        var _nativeEvent$layout = nativeEvent.layout,
            width = _nativeEvent$layout.width,
            height = _nativeEvent$layout.height;
        var onLayout = _this.props.onLayout;
        onLayout({
          previewHeight: height,
          previewWidth: width
        });
      }
    };

    return _this;
  }

  _createClass(AbsolutePositionedKeyboardAwareView, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.keyboardDidShowListener = _reactNative.Keyboard.addListener('keyboardDidShow', this.keyboardDidShowHandler);
      this.keyboardDidHideListener = _reactNative.Keyboard.addListener('keyboardDidHide', this.keyboardDidHideHandler);

      _reactNative.Dimensions.addEventListener('change', this.removeKeyboardOnOrientationChange);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.keyboardDidShowListener.remove();
      this.keyboardDidHideListener.remove();

      _reactNative.Dimensions.removeEventListener('change', this.removeKeyboardOnOrientationChange);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          previewWidth = _this$props.previewWidth,
          previewHeight = _this$props.previewHeight;
      return _react["default"].createElement(_reactNative.View, {
        style: {
          flex: 1
        },
        onLayout: this.onLayoutHandler
      }, _react["default"].createElement(_reactNative.View, {
        style: previewWidth === 0 ? {
          flex: 1
        } : {
          position: 'absolute',
          width: previewWidth,
          height: previewHeight
        }
      }, children));
    }
  }]);

  return AbsolutePositionedKeyboardAwareView;
}(_react.PureComponent);

exports["default"] = AbsolutePositionedKeyboardAwareView;