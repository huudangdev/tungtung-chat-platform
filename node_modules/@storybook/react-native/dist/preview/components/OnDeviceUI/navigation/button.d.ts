import { PureComponent } from 'react';
interface Props {
    id: number | string;
    active: boolean;
    onPress: (id: number | string) => void;
}
export default class Button extends PureComponent<Props> {
    onPress: () => void;
    render(): JSX.Element;
}
export {};
