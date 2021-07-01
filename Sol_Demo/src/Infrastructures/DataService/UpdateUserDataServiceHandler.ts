import { IDatabase } from "pg-promise";
import IRequest from "../../../Frameworks/MediatR/Core/Request/IRequest";
import IRequestHandler from "../../../Frameworks/MediatR/Core/Request/IRequestHandler";
import { IPostgresProvider } from "../../../Frameworks/PostgresProvider/Core/PostgresProvider";
import { IConfiguration } from "../../Config/Settings/Core/Configuration";
import UserLoginModel from "../../Models/UserLoginModel";
import UserModel from "../../Models/UserModel";
import UserDataServiceAbstract from "../Abstracts/UserDataServiceAbstract";

export class UpdateUserDataService extends UserModel implements IRequest<boolean>
{
    constructor(userIdentity:String,firstName:String,lastName:String,userName:String,password:String){
        super();
        this.FirstName=firstName;
        this.LastName=lastName;
        this.UserIdentity=userIdentity;
        this.UserLogin=new UserLoginModel();
        this.UserLogin.UserName=userName;
        this.UserLogin.Password=password;
    }
}

export class UpdateUserDataServiceHandler extends UserDataServiceAbstract implements IRequestHandler<UpdateUserDataService,boolean>{

    private readonly postgresProvider:IPostgresProvider=undefined;
    private readonly configuration:IConfiguration=undefined;

    constructor(postgresProvider:IPostgresProvider,configuration:IConfiguration){
        super();
        this.configuration=configuration;
        this.postgresProvider=postgresProvider;
    }


    public async HandleAsync(request: UpdateUserDataService): Promise<boolean> {
        try
        {
            let postgressConfig=this.SetPostgressConfig(this.configuration);
            let db:IDatabase<any>=await this.postgresProvider.OpenSqlConnectionAsync(postgressConfig);

            // Need To Implement
         
            return true;
        }
        catch(ex)
        {
             throw ex;
        }
        finally
        {
            await this.postgresProvider.CloseSqlConnectionAsync();
        }
    }

}