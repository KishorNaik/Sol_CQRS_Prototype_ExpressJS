import UserModel from "../../Models/UserModel";
import IRequest from "../../../Frameworks/MediatR/Core/Request/IRequest";
import IRequestHandler from "../../../Frameworks/MediatR/Core/Request/IRequestHandler";
import { IPostgresProvider } from "../../../Frameworks/PostgresProvider/Core/PostgresProvider";
import { IConfiguration } from "../../Config/Settings/Core/Configuration";
import UserDataServiceAbstract from "../Abstracts/UserDataServiceAbstract";
import { IDatabase } from "pg-promise";
import UserLoginModel from "../../Models/UserLoginModel";

export class CreateUserDataService extends UserModel implements IRequest<string> {

    constructor(firstName:String,lastName:String,userName:String,password:String){
        super();
        this.FirstName=firstName;
        this.LastName=lastName;
        this.UserLogin=new UserLoginModel();
        this.UserLogin.UserName=userName;
        this.UserLogin.Password=password;
    }
}

export class CreateUserDataServiceHandler extends UserDataServiceAbstract implements IRequestHandler<CreateUserDataService,String>{

    private readonly postgresProvider:IPostgresProvider=null;
    private readonly configuration:IConfiguration=null;

    constructor(postgresProvider:IPostgresProvider,configuration:IConfiguration){
        super();
        this.postgresProvider=postgresProvider;
        this.configuration=configuration;
    }


    public async HandleAsync(request: CreateUserDataService): Promise<String> {
       try
       {
           let postgressConfig=this.SetPostgressConfig(this.configuration);
           let db:IDatabase<any>=await this.postgresProvider.OpenSqlConnectionAsync(postgressConfig);
        
           const {funcsetuser}=await db.one(`SELECT funcSetUser($1,$2,$3,$4,$5,$6)`,['Add',null,request.FirstName,request.LastName,request.UserLogin.UserName,request.UserLogin.Password]);
           
           return (funcsetuser as String).replace(/[()]/g, '');
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