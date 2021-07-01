import { IConfiguration } from "../../Config/Settings/Core/Configuration";

export interface IPostgresConfig{
    host:String,
    port:number,
    database:String,
    user:String,
    password:String
}


export default abstract class UserDataServiceAbstract{

    constructor(){

    }

    protected SetPostgressConfig(configuration:IConfiguration): IPostgresConfig{

        let postgressConfig:IPostgresConfig={};

        if(process.env.NODE_ENV==="development"){
            postgressConfig.database=configuration.AppSettingConfig.Development.PostgresDbConnection.database;
            postgressConfig.host=configuration.AppSettingConfig.Development.PostgresDbConnection.host;
            postgressConfig.user=configuration.AppSettingConfig.Development.PostgresDbConnection.user;
            postgressConfig.password=configuration.AppSettingConfig.Development.PostgresDbConnection.password;
            postgressConfig.port=configuration.AppSettingConfig.Development.PostgresDbConnection.port;
        }
        else
        {
           // Not Set Production Yet.
        }

        return postgressConfig;
        
    }

}