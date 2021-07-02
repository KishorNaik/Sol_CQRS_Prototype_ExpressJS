import { IDatabase } from "pg-promise";
import IRequest from "../../../Frameworks/MediatR/Core/Request/IRequest";
import IRequestHandler from "../../../Frameworks/MediatR/Core/Request/IRequestHandler";
import { IPostgresProvider } from "../../../Frameworks/PostgresProvider/Core/PostgresProvider";
import { IConfiguration } from "../../Config/Settings/Core/Configuration";
import UserModel from "../../Models/UserModel";
import UserDataServiceAbstract from "../Abstracts/UserDataServiceAbstract";

export class GetAllUsersDataService implements IRequest<UserModel[]>{

}

export class GetAllUserDataServiceHandler extends UserDataServiceAbstract implements IRequestHandler<GetAllUsersDataService,UserModel[]>{

    private readonly postgresProvider:IPostgresProvider=null;
    private readonly configuration:IConfiguration=null;

    constructor(postgresProvider:IPostgresProvider,configuration:IConfiguration){
        super();
        this.postgresProvider=postgresProvider;
        this.configuration=configuration;
    }

    public async HandleAsync(request: GetAllUsersDataService): Promise<UserModel[]> {
        try
        {
            let postgressConfig=this.SetPostgressConfig(this.configuration);
            let db:IDatabase<any>=await this.postgresProvider.OpenSqlConnectionAsync(postgressConfig);
         
            // Need to Implement
 
            return new Array<UserModel>();
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