import { ISocket, IDriver } from '../drivers';
import ClientRest from '../api/RocketChat';
import { ILogger, ISocketOptions, ICallback, ISubscription, ICredentials } from '../../interfaces';
export default class RocketChatClient extends ClientRest implements ISocket {
    userId: string;
    logger: ILogger;
    socket: Promise<ISocket | IDriver>;
    config: any;
    constructor({ logger, allPublic, rooms, integrationId, protocol, ...config }: any);
    resume({ token }: {
        token: string;
    }): Promise<any>;
    login(credentials: ICredentials): Promise<any>;
    connect(options: ISocketOptions): Promise<any>;
    disconnect(): Promise<any>;
    onStreamData(event: string, cb: ICallback): Promise<any>;
    subscribe(topic: string, ...args: any[]): Promise<ISubscription>;
    unsubscribe(subscription: ISubscription): Promise<any>;
    unsubscribeAll(): Promise<any>;
    subscribeRoom(rid: string, ...args: any[]): Promise<ISubscription[]>;
    subscribeNotifyAll(): Promise<any>;
    subscribeLoggedNotify(): Promise<any>;
    subscribeNotifyUser(): Promise<any>;
    readonly url: Promise<any>;
    onMessage(cb: ICallback): Promise<any>;
    methodCall(method: string, ...args: any[]): Promise<ISubscription>;
}
