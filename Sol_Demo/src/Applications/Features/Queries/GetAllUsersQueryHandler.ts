import { IMediatR } from "../../../../Frameworks/MediatR/Core/MediatR";
import IRequest from "../../../../Frameworks/MediatR/Core/Request/IRequest";
import IRequestHandler from "../../../../Frameworks/MediatR/Core/Request/IRequestHandler";
import { GetAllUsersDataService } from "../../../Infrastructures/DataService/GetAllUsersDataServiceHandler";
import UserModel from "../../../Models/UserModel";

export class GetAllUsersQuery implements IRequest<UserModel[]>{

}

export class GetAllUserQueryHandler implements IRequestHandler<GetAllUsersQuery,UserModel[]>{

    private readonly mediatR:IMediatR=undefined;

    constructor(mediatR:IMediatR){
        this.mediatR=mediatR;
    }


    public HandleAsync(request: GetAllUsersQuery): Promise<UserModel[]> {
        try
        {
            return this.mediatR.SendAsync<UserModel[],GetAllUsersDataService>(new GetAllUsersDataService());
        }
        catch(ex)
        {
            throw ex;
        }
    }

}