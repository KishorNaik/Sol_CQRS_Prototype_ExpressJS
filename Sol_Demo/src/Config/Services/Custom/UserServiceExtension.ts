import Bottle from "bottlejs";
import { IMediatRRegister } from "../../../../Frameworks/MediatR/Core/MediatR";
import { CreateUserCommand, CreateUserCommandHandler } from "../../../Applications/Features/Commands/CreateUserCommandHandler";
import { RemoveUserCommand, RemoveUserCommandHandler } from "../../../Applications/Features/Commands/RemoveUserCommandHandler";
import { UpdateUserCommand, UpdateUserCommandHandler } from "../../../Applications/Features/Commands/UpdateUserCommandHandler";
import { WelcomeUserEmailEvent, WelcomeUserEmailHandler } from "../../../Applications/Features/Events/WelcomeUserEmailEventHandler";
import { GetAllUserQueryHandler, GetAllUsersQuery } from "../../../Applications/Features/Queries/GetAllUsersQueryHandler";
import { CreateUserValidation, CreateUserValidationHandler } from "../../../Applications/Validations/CreateUserValidationHandler";
import { RemoveUserValidation, RemoveUserValidationHandler } from "../../../Applications/Validations/RemoveUserValidationHandler";
import { UpdateUserValidation, UpdateUserValidationHandler } from "../../../Applications/Validations/UpdateUserValidationHandler";
import UserController from "../../../Controllers/UserController";
import { CreateUserDataService, CreateUserDataServiceHandler } from "../../../Infrastructures/DataService/CreateUserDataServiceHandler";
import { GetAllUserDataServiceHandler, GetAllUsersDataService } from "../../../Infrastructures/DataService/GetAllUsersDataServiceHandler";
import { RemoveUserDataService, RemoveUserDataServiceHandler } from "../../../Infrastructures/DataService/RemoveUserDataServiceHandler";
import { UpdateUserDataService, UpdateUserDataServiceHandler } from "../../../Infrastructures/DataService/UpdateUserDataServiceHandler";

export const AddUserServiceExtension=function(bottleContainer:Bottle):void{

    let DataServiceHandler=function():void{
        bottleContainer.service("createUserDataServiceHandler",CreateUserDataServiceHandler,"postgresProvider","configurations");
        bottleContainer.service("updateUserDataServiceHandler",UpdateUserDataServiceHandler,"postgresProvider","configurations");
        bottleContainer.service("deleteUserDataServiceHandler",RemoveUserDataServiceHandler,"postgresProvider","configurations");

        bottleContainer.service("getAllUsersDataServiceHandler",GetAllUserDataServiceHandler,"postgresProvider","configurations");
    }

    let CommanHandler=function():void{
        bottleContainer.service("createUserCommandHandler",CreateUserCommandHandler,"mediatR");
        bottleContainer.service("updateUserCommandHandler",UpdateUserCommandHandler,"mediatR");
        bottleContainer.service("removeUserCommandHandler",RemoveUserCommandHandler,"mediatR");
    }

    let EventHandler=function():void{
        bottleContainer.service("welcomeUserEventHandler",WelcomeUserEmailHandler);
    }

    let QueryHandler=function():void{
        bottleContainer.service("getAllUserQueryHandler",GetAllUserQueryHandler,"mediatR");
    }

    let ValidationHandler=function():void{
        bottleContainer.service("createUserValidationHandler",CreateUserValidationHandler);
        bottleContainer.service("updateUserValidationHandler",UpdateUserValidationHandler);
        bottleContainer.service("deleteUserValidationHandler",RemoveUserValidationHandler);
    }

    let Controller=function():void{
        bottleContainer.service("userController",UserController,"mediatR");
    }

    let MediatRRegistration=function(){
        let mediatR:IMediatRRegister=bottleContainer.container.mediatR;
        
        // Create User
        mediatR.Register(CreateUserDataService,bottleContainer.container.createUserDataServiceHandler);
        mediatR.Register(CreateUserCommand,bottleContainer.container.createUserCommandHandler);
        mediatR.Register(WelcomeUserEmailEvent,bottleContainer.container.welcomeUserEventHandler);
        mediatR.Register(CreateUserValidation,bottleContainer.container.createUserValidationHandler);

        // Update User
        mediatR.Register(UpdateUserDataService,bottleContainer.container.updateUserDataServiceHandler);
        mediatR.Register(UpdateUserCommand,bottleContainer.container.updateUserCommandHandler);
        mediatR.Register(UpdateUserValidation,bottleContainer.container.updateUserValidationHandler);

        // Remove User
        mediatR.Register(RemoveUserDataService,bottleContainer.container.deleteUserDataServiceHandler);
        mediatR.Register(RemoveUserCommand,bottleContainer.container.removeUserCommandHandler);
        mediatR.Register(RemoveUserValidation,bottleContainer.container.deleteUserValidationHandler);

        // Get All Users
        mediatR.Register(GetAllUsersDataService,bottleContainer.container.getAllUsersDataServiceHandler);
        mediatR.Register(GetAllUsersQuery,bottleContainer.container.getAllUserQueryHandler);
    }




    DataServiceHandler();
    CommanHandler();
    EventHandler();
    ValidationHandler();
    QueryHandler();
    Controller();
    MediatRRegistration();
}