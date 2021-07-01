import { IMediatR } from "../../../../Frameworks/MediatR/Core/MediatR";
import IRequest from "../../../../Frameworks/MediatR/Core/Request/IRequest";
import IRequestHandler from "../../../../Frameworks/MediatR/Core/Request/IRequestHandler";
import { UpdateUserDataService } from "../../../Infrastructures/DataService/UpdateUserDataServiceHandler";

export class UpdateUserCommand implements IRequest<boolean>{
    public UserIdentity:String;
    public FirstName:String;
    public LastName:String;
    public UserName:String;
    public Password:String;

    constructor(userIdentity:String,firstName:String,lastName:String,userName:String,password:String){
        this.UserIdentity=userIdentity;
        this.FirstName=firstName;
        this.LastName=lastName;
        this.UserName=userName;
        this.Password=password;
    }
}

export class UpdateUserCommandHandler implements IRequestHandler<UpdateUserCommand,boolean>{

    private readonly mediatR:IMediatR=undefined;

    constructor(mediaR:IMediatR){
        this.mediatR=mediaR;
    }

    public HandleAsync(request: UpdateUserCommand): Promise<boolean> {
        try
        {
            return this.mediatR.SendAsync<boolean,UpdateUserDataService>(new UpdateUserDataService(request.UserIdentity,request.FirstName,request.LastName,request.UserName,request.Password));
        }
        catch(ex)
        {
            throw ex;
        }
    }

}