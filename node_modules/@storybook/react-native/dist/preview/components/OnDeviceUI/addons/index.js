"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.object.create");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.keys");

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

var _addons = _interopRequireDefault(require("@storybook/addons"));

var _list = _interopRequireDefault(require("./list"));

var _wrapper = _interopRequireDefault(require("./wrapper"));

var _text = require("../../Shared/text");

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

var NoAddonContainer =
/*#__PURE__*/
_native["default"].View("flex:1;align-items:center;justify-content:center;");

var Container =
/*#__PURE__*/
_native["default"].View("flex:1;background:", function (props) {
  return props.theme.backgroundColor;
}, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9wcmV2aWV3L2NvbXBvbmVudHMvT25EZXZpY2VVSS9hZGRvbnMvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWM2QiIsImZpbGUiOiIuLi8uLi8uLi8uLi8uLi9zcmMvcHJldmlldy9jb21wb25lbnRzL09uRGV2aWNlVUkvYWRkb25zL2luZGV4LnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBQdXJlQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9uYXRpdmUnO1xuaW1wb3J0IGFkZG9ucyBmcm9tICdAc3Rvcnlib29rL2FkZG9ucyc7XG5pbXBvcnQgQWRkb25zTGlzdCBmcm9tICcuL2xpc3QnO1xuaW1wb3J0IEFkZG9uV3JhcHBlciBmcm9tICcuL3dyYXBwZXInO1xuaW1wb3J0IHsgTGFiZWwgfSBmcm9tICcuLi8uLi9TaGFyZWQvdGV4dCc7XG5pbXBvcnQgeyBFbW90aW9uUHJvcHMgfSBmcm9tICcuLi8uLi9TaGFyZWQvdGhlbWUnO1xuXG5jb25zdCBOb0FkZG9uQ29udGFpbmVyID0gc3R5bGVkLlZpZXdgXG4gIGZsZXg6IDE7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuYDtcblxuY29uc3QgQ29udGFpbmVyID0gc3R5bGVkLlZpZXdgXG4gIGZsZXg6IDE7XG4gIGJhY2tncm91bmQ6ICR7KHByb3BzOiBFbW90aW9uUHJvcHMpID0+IHByb3BzLnRoZW1lLmJhY2tncm91bmRDb2xvcn07XG5gO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBZGRvbnMgZXh0ZW5kcyBQdXJlQ29tcG9uZW50PHt9LCB7IGFkZG9uU2VsZWN0ZWQ6IHN0cmluZyB9PiB7XG4gIHBhbmVscyA9IGFkZG9ucy5nZXRFbGVtZW50cygncGFuZWwnKTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wczoge30pIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgYWRkb25TZWxlY3RlZDogT2JqZWN0LmtleXModGhpcy5wYW5lbHMpWzBdIHx8IG51bGwsXG4gICAgfTtcbiAgfVxuXG4gIG9uUHJlc3NBZGRvbiA9IChhZGRvblNlbGVjdGVkOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHsgYWRkb25TZWxlY3RlZCB9KTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBhZGRvblNlbGVjdGVkIH0gPSB0aGlzLnN0YXRlO1xuXG4gICAgaWYgKE9iamVjdC5rZXlzKHRoaXMucGFuZWxzKS5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxOb0FkZG9uQ29udGFpbmVyPlxuICAgICAgICAgIDxMYWJlbD5ObyBhZGRvbnMgbG9hZGVkLjwvTGFiZWw+XG4gICAgICAgIDwvTm9BZGRvbkNvbnRhaW5lcj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxDb250YWluZXI+XG4gICAgICAgIDxBZGRvbnNMaXN0XG4gICAgICAgICAgb25QcmVzc0FkZG9uPXt0aGlzLm9uUHJlc3NBZGRvbn1cbiAgICAgICAgICBwYW5lbHM9e3RoaXMucGFuZWxzfVxuICAgICAgICAgIGFkZG9uU2VsZWN0ZWQ9e2FkZG9uU2VsZWN0ZWR9XG4gICAgICAgIC8+XG4gICAgICAgIDxBZGRvbldyYXBwZXIgYWRkb25TZWxlY3RlZD17YWRkb25TZWxlY3RlZH0gcGFuZWxzPXt0aGlzLnBhbmVsc30gLz5cbiAgICAgIDwvQ29udGFpbmVyPlxuICAgICk7XG4gIH1cbn1cbiJdfQ== */"));

var Addons =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Addons, _PureComponent);

  function Addons(props) {
    var _this;

    _classCallCheck(this, Addons);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Addons).call(this, props));
    _this.panels = _addons["default"].getElements('panel');

    _this.onPressAddon = function (addonSelected) {
      _this.setState({
        addonSelected: addonSelected
      });
    };

    _this.state = {
      addonSelected: Object.keys(_this.panels)[0] || null
    };
    return _this;
  }

  _createClass(Addons, [{
    key: "render",
    value: function render() {
      var addonSelected = this.state.addonSelected;

      if (Object.keys(this.panels).length === 0) {
        return _react["default"].createElement(NoAddonContainer, null, _react["default"].createElement(_text.Label, null, "No addons loaded."));
      }

      return _react["default"].createElement(Container, null, _react["default"].createElement(_list["default"], {
        onPressAddon: this.onPressAddon,
        panels: this.panels,
        addonSelected: addonSelected
      }), _react["default"].createElement(_wrapper["default"], {
        addonSelected: addonSelected,
        panels: this.panels
      }));
    }
  }]);

  return Addons;
}(_react.PureComponent);

exports["default"] = Addons;