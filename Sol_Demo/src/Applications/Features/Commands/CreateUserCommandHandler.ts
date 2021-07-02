import { IMediatR } from "../../../../Frameworks/MediatR/Core/MediatR";
import IRequest from "../../../../Frameworks/MediatR/Core/Request/IRequest";
import IRequestHandler from "../../../../Frameworks/MediatR/Core/Request/IRequestHandler";
import { CreateUserDataService } from "../../../Infrastructures/DataService/CreateUserDataServiceHandler";
import { WelcomeUserEmailEvent } from "../Events/WelcomeUserEmailEventHandler";

export class CreateUserCommand implements IRequest<String>{
    public FirstName:String;
    public LastName:String;
    public UserName:String;
    public Password:String;

    constructor(firstName:String,lastName:String,userName:String,password:String){
        this.FirstName=firstName;
        this.LastName=lastName;
        this.UserName=userName;
        this.Password=password;
    }
}

export class CreateUserCommandHandler implements IRequestHandler<CreateUserCommand,String>{
    
    private readonly mediatR:IMediatR=undefined;

    constructor(mediatR:IMediatR){
        this.mediatR=mediatR;
    }
    
    
    public async HandleAsync(request: CreateUserCommand): Promise<String> {
       try
       {
            let result= await this.mediatR.SendAsync<String,CreateUserDataService>(new CreateUserDataService(request.FirstName,request.LastName,request.UserName,request.Password));

            if(result){
                // Send Email
                this.mediatR.PublishAsync<WelcomeUserEmailEvent>(new WelcomeUserEmailEvent(request.UserName));
            }

            return result;
       }
       catch(ex){
           throw ex;
       }
    }


}