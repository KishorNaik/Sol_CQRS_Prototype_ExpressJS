import { IMediatR } from "../../../../Frameworks/MediatR/Core/MediatR";
import IRequest from "../../../../Frameworks/MediatR/Core/Request/IRequest";
import IRequestHandler from "../../../../Frameworks/MediatR/Core/Request/IRequestHandler";
import { RemoveUserDataService } from "../../../Infrastructures/DataService/RemoveUserDataServiceHandler";

export class RemoveUserCommand implements IRequest<boolean>{
    public UserIdentity:String;

    constructor(userIdentity:String){
        this.UserIdentity=userIdentity;
    }
}

export class RemoveUserCommandHandler implements IRequestHandler<RemoveUserCommand,boolean>{

    private readonly mediatR:IMediatR=undefined;

    constructor(mediatR:IMediatR){
        this.mediatR=mediatR;
    }

    public HandleAsync(request: RemoveUserCommand): Promise<boolean> {
        try
        {
            return this.mediatR.SendAsync<boolean,RemoveUserDataService>(new RemoveUserDataService(request.UserIdentity));
        }
        catch(ex)
        {
            throw ex;
        }
    }


}