import INotification from "../../../../Frameworks/MediatR/Core/Notification/INotification";
import INotificationHandler from "../../../../Frameworks/MediatR/Core/Notification/INotificationHandler";

export class WelcomeUserEmailEvent implements INotification{

    public Email:String=undefined;

    constructor(email:String){
        this.Email=email;
    }
}

export class WelcomeUserEmailHandler implements INotificationHandler<WelcomeUserEmailEvent>{

    public HandleAsync(notification: WelcomeUserEmailEvent): Promise<void> {

        return new Promise((resolve,reject)=>{
            try
            {
                console.log("Email",notification.Email);
                // Email Code
                resolve();
            }
            catch(ex)
            {
                reject(ex);
                throw ex;
            }
        });
       
    }

}