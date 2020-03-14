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

var _reactNativeSwipeGestures = _interopRequireDefault(require("react-native-swipe-gestures"));

var _bar = _interopRequireDefault(require("./bar"));

var _visibilityButton = _interopRequireDefault(require("./visibility-button"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

var SWIPE_CONFIG = {
  velocityThreshold: 0.2,
  directionalOffsetThreshold: 80
};

var style = _reactNative.StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0
  }
});

var Navigation =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Navigation, _PureComponent);

  function Navigation() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Navigation);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Navigation)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      isUIVisible: _this.props.initialUiVisible !== undefined ? _this.props.initialUiVisible : true
    };

    _this.handleToggleUI = function () {
      var isUIVisible = _this.state.isUIVisible;

      _this.setState({
        isUIVisible: !isUIVisible
      });
    };

    _this.handleSwipeLeft = function () {
      var _this$props = _this.props,
          tabOpen = _this$props.tabOpen,
          onChangeTab = _this$props.onChangeTab;

      if (tabOpen < 1) {
        onChangeTab(tabOpen + 1);
      }
    };

    _this.handleSwipeRight = function () {
      var _this$props2 = _this.props,
          tabOpen = _this$props2.tabOpen,
          onChangeTab = _this$props2.onChangeTab;

      if (tabOpen > -1) {
        onChangeTab(tabOpen - 1);
      }
    };

    return _this;
  }

  _createClass(Navigation, [{
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          tabOpen = _this$props3.tabOpen,
          onChangeTab = _this$props3.onChangeTab;
      var isUIVisible = this.state.isUIVisible;
      return _react["default"].createElement(_reactNative.View, {
        style: style.wrapper
      }, _react["default"].createElement(_reactNative.SafeAreaView, null, isUIVisible && _react["default"].createElement(_reactNativeSwipeGestures["default"], {
        onSwipeLeft: this.handleSwipeLeft,
        onSwipeRight: this.handleSwipeRight,
        config: SWIPE_CONFIG
      }, _react["default"].createElement(_bar["default"], {
        index: tabOpen,
        onPress: onChangeTab
      })), _react["default"].createElement(_reactNative.View, null, _react["default"].createElement(_visibilityButton["default"], {
        onPress: this.handleToggleUI
      }))));
    }
  }]);

  return Navigation;
}(_react.PureComponent);

exports["default"] = Navigation;