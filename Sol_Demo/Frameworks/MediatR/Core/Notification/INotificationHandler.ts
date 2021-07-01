import INotification from "./INotification";

export default interface INotificationHandler<TNotification extends INotification>{
    HandleAsync(notification:TNotification): Promise<void>;
}