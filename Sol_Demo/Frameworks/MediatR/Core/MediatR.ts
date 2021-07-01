import INotification from "./Notification/INotification";
import INotificationHandler from "./Notification/INotificationHandler";
import IRequest from "./Request/IRequest";
import IRequestHandler from "./Request/IRequestHandler";

export interface IMediatRRegister{
    Register<TRequest extends IRequest<TReturnType>,TReturnType>(requestType:any,requestHandler:IRequestHandler<TRequest,TReturnType>):void;
    Register<TNotification extends INotification>(notificationType:any,notificationHandler:INotificationHandler<TNotification>):void;
}

export interface IMediatR{
    
    SendAsync<TReturnType,TRequest>(request:TRequest) : Promise<TReturnType>;
    PublishAsync<TNotification>(notification:TNotification) : Promise<void>;
}

export class MediatR implements IMediatRRegister, IMediatR{
    

    private keyValuePairs:Map<any,any>=new Map<any,any>();

    public Register<TRequest extends IRequest<TReturnType>,TReturnType>(requestType:any,requestHandler:IRequestHandler<TRequest,TReturnType>):void{
        //console.log(requestType);
        this.keyValuePairs.set(requestType,requestHandler);
    }

    public Register<TNotification extends INotification>(notificationType:any,notificationHandler:INotificationHandler<TNotification>):void{
        this.keyValuePairs.set(notificationType,notificationHandler);
    }

    public async SendAsync<TReturnType,TRequest extends IRequest<TReturnType>>(request:TRequest) : Promise<TReturnType>{
       // console.log(request.constructor);
        var handler=this.keyValuePairs.get(request.constructor);
        //console.log(handler);

        return await (<IRequestHandler<TRequest,TReturnType>>handler).HandleAsync(request);
    }

    public async PublishAsync<TNotification extends INotification>(notification: TNotification): Promise<void> {
        var handler=this.keyValuePairs.get(notification.constructor);

        await (<INotificationHandler<TNotification>>handler).HandleAsync(notification);
    }

}