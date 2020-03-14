import { PureComponent } from 'react';
import { EmitterSubscription, LayoutChangeEvent, KeyboardEvent } from 'react-native';
export interface PreviewDimens {
    previewWidth: number;
    previewHeight: number;
}
declare type Props = {
    onLayout: (dimens: PreviewDimens) => void;
} & PreviewDimens;
export default class AbsolutePositionedKeyboardAwareView extends PureComponent<Props> {
    keyboardDidShowListener: EmitterSubscription;
    keyboardDidHideListener: EmitterSubscription;
    keyboardOpen: boolean;
    componentWillMount(): void;
    componentWillUnmount(): void;
    keyboardDidShowHandler: (e: KeyboardEvent) => void;
    removeKeyboardOnOrientationChange: () => void;
    keyboardDidHideHandler: () => void;
    onLayoutHandler: ({ nativeEvent }: LayoutChangeEvent) => void;
    render(): JSX.Element;
}
export {};
