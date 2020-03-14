import { NativeModules } from 'react-native';

const { RootView } = NativeModules;

const isIOS = Platform.OS === 'ios';

const setRootViewColor = (color) => {
  if (isIOS) {
    let c = color.substring(1).split('');
    c = `0x${ c.join('') }`;
    RootView.setColor(
      parseFloat((c >> 16) & 255),
      parseFloat((c >> 8) & 255),
      parseFloat(c & 255),
      1
    );
  } else {
    RootView.setColor(color);
  }
};

export default setRootViewColor;
