var Colors = require('material-ui/lib/styles/colors');
var ColorManipulator = require('material-ui/lib/utils/color-manipulator');
var Spacing = require('material-ui/lib/styles/spacing');
var zIndex = require('material-ui/lib/styles/zIndex');

module.exports =  {
  spacing: Spacing,
  zIndex: zIndex,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: Colors.red900,
    primary2Color: Colors.purple500,
    primary3Color: Colors.red100,
    accent1Color: Colors.grey100,
    accent2Color: Colors.grey100,
    accent3Color: Colors.grey100,
    textColor: Colors.grey900,
    alternateTextColor: Colors.grey200,
    canvasColor: Colors.grey300,
    borderColor: Colors.grey500,
    // disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3),
    pickerHeaderColor: Colors.purple700,
  }
};
