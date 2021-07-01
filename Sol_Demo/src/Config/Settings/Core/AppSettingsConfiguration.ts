export type AppSettingsConfiguration={
    Production:{
        Port:number;
    },
    Development:{
        Port:number;
        PostgresDbConnection:{
            host:String,
            port:number,
            database:String,
            user:String,
            password:String
        }
    }
}