import { PureComponent } from 'react';
import { Animated } from 'react-native';
import Channel from '@storybook/channels';
import { PreviewDimens } from './absolute-positioned-keyboard-aware-view';
interface OnDeviceUIProps {
    stories: any;
    url?: string;
    tabOpen?: number;
    isUIHidden?: boolean;
    shouldDisableKeyboardAvoidingView?: boolean;
    keyboardAvoidingViewVerticalOffset?: number;
}
interface OnDeviceUIState {
    tabOpen: number;
    slideBetweenAnimation: boolean;
    previewWidth: number;
    previewHeight: number;
}
export default class OnDeviceUI extends PureComponent<OnDeviceUIProps, OnDeviceUIState> {
    animatedValue: Animated.Value;
    channel: Channel;
    constructor(props: OnDeviceUIProps);
    onLayout: ({ previewWidth, previewHeight }: PreviewDimens) => void;
    handleOpenPreview: () => void;
    handleToggleTab: (newTabOpen: number) => void;
    render(): JSX.Element;
}
export {};
