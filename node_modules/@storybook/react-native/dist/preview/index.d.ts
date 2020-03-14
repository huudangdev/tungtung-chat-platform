import React from 'react';
import { StoryStore, ClientApi } from '@storybook/client-api';
import { EmotionProps } from './components/Shared/theme';
export declare type Params = {
    onDeviceUI: boolean;
    resetStorybook: boolean;
    disableWebsockets: boolean;
    query: string;
    host: string;
    port: number;
    secured: boolean;
    initialSelection: any;
    shouldPersistSelection: boolean;
    tabOpen: number;
    isUIHidden: boolean;
    shouldDisableKeyboardAvoidingView: boolean;
    keyboardAvoidingViewVerticalOffset: number;
} & EmotionProps;
export default class Preview {
    _clientApi: ClientApi;
    _stories: StoryStore;
    _addons: any;
    _decorators: any[];
    _asyncStorageStoryId: string;
    constructor();
    api: () => any;
    configure: (loadStories: () => void, module: any) => void;
    getStorybookUI: (params?: Partial<Params>) => {
        new (props: Readonly<{}>): {
            render(): JSX.Element;
            context: any;
            setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<{}>) => {} | Pick<{}, K>) | Pick<{}, K>, callback?: () => void): void;
            forceUpdate(callBack?: () => void): void;
            readonly props: Readonly<{}> & Readonly<{
                children?: React.ReactNode;
            }>;
            state: Readonly<{}>;
            refs: {
                [key: string]: React.ReactInstance;
            };
            componentDidMount?(): void;
            shouldComponentUpdate?(nextProps: Readonly<{}>, nextState: Readonly<{}>, nextContext: any): boolean;
            componentWillUnmount?(): void;
            componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
            getSnapshotBeforeUpdate?(prevProps: Readonly<{}>, prevState: Readonly<{}>): any;
            componentDidUpdate?(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any): void;
            componentWillMount?(): void;
            UNSAFE_componentWillMount?(): void;
            componentWillReceiveProps?(nextProps: Readonly<{}>, nextContext: any): void;
            UNSAFE_componentWillReceiveProps?(nextProps: Readonly<{}>, nextContext: any): void;
            componentWillUpdate?(nextProps: Readonly<{}>, nextState: Readonly<{}>, nextContext: any): void;
            UNSAFE_componentWillUpdate?(nextProps: Readonly<{}>, nextState: Readonly<{}>, nextContext: any): void;
        };
        new (props: {}, context?: any): {
            render(): JSX.Element;
            context: any;
            setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<{}>) => {} | Pick<{}, K>) | Pick<{}, K>, callback?: () => void): void;
            forceUpdate(callBack?: () => void): void;
            readonly props: Readonly<{}> & Readonly<{
                children?: React.ReactNode;
            }>;
            state: Readonly<{}>;
            refs: {
                [key: string]: React.ReactInstance;
            };
            componentDidMount?(): void;
            shouldComponentUpdate?(nextProps: Readonly<{}>, nextState: Readonly<{}>, nextContext: any): boolean;
            componentWillUnmount?(): void;
            componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
            getSnapshotBeforeUpdate?(prevProps: Readonly<{}>, prevState: Readonly<{}>): any;
            componentDidUpdate?(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any): void;
            componentWillMount?(): void;
            UNSAFE_componentWillMount?(): void;
            componentWillReceiveProps?(nextProps: Readonly<{}>, nextContext: any): void;
            UNSAFE_componentWillReceiveProps?(nextProps: Readonly<{}>, nextContext: any): void;
            componentWillUpdate?(nextProps: Readonly<{}>, nextState: Readonly<{}>, nextContext: any): void;
            UNSAFE_componentWillUpdate?(nextProps: Readonly<{}>, nextState: Readonly<{}>, nextContext: any): void;
        };
        contextType?: React.Context<any>;
    };
    _sendSetStories(): void;
    _setInitialStory: (initialSelection: any, shouldPersistSelection?: boolean) => Promise<void>;
    _getInitialStory: (initialSelection: any, shouldPersistSelection?: boolean) => () => Promise<any>;
    _getStory(storyId: string): any;
    _selectStoryEvent({ storyId }: {
        storyId: string;
    }): void;
    _selectStory(story: any): void;
    _checkStory(storyId: string): any;
}
