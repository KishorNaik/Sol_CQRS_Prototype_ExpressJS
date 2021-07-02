import { IDatabase } from "pg-promise";
import IRequest from "../../../Frameworks/MediatR/Core/Request/IRequest";
import IRequestHandler from "../../../Frameworks/MediatR/Core/Request/IRequestHandler";
import { IPostgresProvider } from "../../../Frameworks/PostgresProvider/Core/PostgresProvider";
import { IConfiguration } from "../../Config/Settings/Core/Configuration";
import UserModel from "../../Models/UserModel";
import UserDataServiceAbstract from "../Abstracts/UserDataServiceAbstract";

export class RemoveUserDataService extends UserModel implements IRequest<boolean>{

    constructor(userIdentity:String){
        super();
        this.UserIdentity=userIdentity;
    }
}

export class RemoveUserDataServiceHandler extends UserDataServiceAbstract implements IRequestHandler<RemoveUserDataService,boolean>{

    private readonly postgresProvider:IPostgresProvider=undefined;
    protected readonly configuration:IConfiguration=undefined;

    constructor(postgresProvider:IPostgresProvider,configuration:IConfiguration){
        super();
        this.configuration=configuration;
        this.postgresProvider=postgresProvider;
    }

    public async HandleAsync(request: RemoveUserDataService): Promise<boolean> {
        try
        {
            let postgressConfig=this.SetPostgressConfig(this.configuration);
            let db:IDatabase<any>=await this.postgresProvider.OpenSqlConnectionAsync(postgressConfig);
         
            await db.one(`SELECT funcSetUser($1,$2,$3,$4,$5,$6)`,['Delete',request.UserIdentity,null,null,null,null]);

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