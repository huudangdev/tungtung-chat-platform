"use strict";

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPreviewScale = exports.getPreviewPosition = exports.getAddonPanelPosition = exports.getNavigatorPanelPosition = void 0;

var _constants = require("./navigation/constants");

var PREVIEW_SCALE = 0.3;

var panelWidth = function panelWidth(width) {
  return width * (1 - PREVIEW_SCALE - 0.05);
};

var getNavigatorPanelPosition = function getNavigatorPanelPosition(animatedValue, previewWidth) {
  return [{
    transform: [{
      translateX: animatedValue.interpolate({
        inputRange: [_constants.NAVIGATOR, _constants.PREVIEW],
        outputRange: [0, -panelWidth(previewWidth) - 1]
      })
    }],
    width: panelWidth(previewWidth)
  }];
};

exports.getNavigatorPanelPosition = getNavigatorPanelPosition;

var getAddonPanelPosition = function getAddonPanelPosition(animatedValue, previewWidth) {
  return [{
    transform: [{
      translateX: animatedValue.interpolate({
        inputRange: [_constants.PREVIEW, _constants.ADDONS],
        outputRange: [previewWidth, previewWidth - panelWidth(previewWidth)]
      })
    }],
    width: panelWidth(previewWidth)
  }];
};

exports.getAddonPanelPosition = getAddonPanelPosition;

var getPreviewPosition = function getPreviewPosition(animatedValue, previewWidth, previewHeight, slideBetweenAnimation) {
  var translateX = previewWidth / 2 - previewWidth * PREVIEW_SCALE / 2 - 6;
  var translateY = -(previewHeight / 2 - previewHeight * PREVIEW_SCALE / 2 - 12);
  return {
    transform: [{
      translateX: animatedValue.interpolate({
        inputRange: [_constants.NAVIGATOR, _constants.PREVIEW, _constants.ADDONS],
        outputRange: [translateX, 0, -translateX]
      })
    }, {
      translateY: animatedValue.interpolate({
        inputRange: [_constants.NAVIGATOR, _constants.PREVIEW, _constants.ADDONS],
        outputRange: [translateY, slideBetweenAnimation ? translateY : 0, translateY]
      })
    }]
  };
};

exports.getPreviewPosition = getPreviewPosition;

var getPreviewScale = function getPreviewScale(animatedValue, slideBetweenAnimation) {
  return {
    transform: [{
      scale: animatedValue.interpolate({
        inputRange: [_constants.NAVIGATOR, _constants.PREVIEW, _constants.ADDONS],
        outputRange: [PREVIEW_SCALE, slideBetweenAnimation ? PREVIEW_SCALE : 1, PREVIEW_SCALE]
      })
    }]
  };
};

exports.getPreviewScale = getPreviewScale;