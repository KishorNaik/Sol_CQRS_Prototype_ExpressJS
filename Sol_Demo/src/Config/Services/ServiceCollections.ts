import {AddSqlProviderService} from "../../../Frameworks/SqlProvider/Extension/SqlProviderServiceExtension";
import {AddConfigurationService} from "../Settings/Extension/ConfigurationServiceExtension";
import {AddPostgresProviderService  } from "../../../Frameworks/PostgresProvider/Extension/PostgresProviderServiceExtension";
import {AddMediatR} from "../../../Frameworks/MediatR/Extension/MediatRServiceExtension";
import { AddUserServiceExtension } from "./Custom/UserServiceExtension";

export default class ServiceCollections{

    constructor(){
        console.log("Services running");
    }

    public AddConfigurationService=AddConfigurationService;
    public AddSqlProviderService=AddSqlProviderService;
    public AddPostgresProviderService=AddPostgresProviderService;
    public AddMediatRService=AddMediatR;
    public AddUserService=AddUserServiceExtension;
}