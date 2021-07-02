import express from "express";
import { ValidationChain, validationResult } from "express-validator";
import { resolve } from "path/posix";
import BaseController from "../../Frameworks/BaseController/BaseController";
import { IMediatR} from "../../Frameworks/MediatR/Core/MediatR";
import { HttpException } from "../../Frameworks/Middlewares/ExceptionHandling/ExceptionMiddlewareExtension";
import { CreateUserCommand } from "../Applications/Features/Commands/CreateUserCommandHandler";
import { RemoveUserCommand } from "../Applications/Features/Commands/RemoveUserCommandHandler";
import { UpdateUserCommand } from "../Applications/Features/Commands/UpdateUserCommandHandler";
import { GetAllUsersQuery } from "../Applications/Features/Queries/GetAllUsersQueryHandler";
import { CreateUserValidation } from "../Applications/Validations/CreateUserValidationHandler";
import { RemoveUserValidation } from "../Applications/Validations/RemoveUserValidationHandler";
import { UpdateUserValidation } from "../Applications/Validations/UpdateUserValidationHandler";
import UserModel from "../Models/UserModel";

export default class UserController extends BaseController{
    
    private readonly mediatR:IMediatR=undefined;

    constructor(mediatR:IMediatR){
        super();

        this.router=express.Router();
        this.routePath="/api/user";

        this.mediatR=mediatR;
     

        this.InitializeRoutes().then((resolve)=>console.log("User Route Initialize"));
    }

    protected async InitializeRoutes(): Promise<void> {
        // http://localhost:3000/api/user/usercreateuser
        this.router.post(`${this.routePath}/createuser`,
            await this.mediatR.SendAsync<ValidationChain[],CreateUserValidation>(new CreateUserValidation()), 
            this.CreateUserAsync.bind(this));

       // http://localhost:3000/api/user/updateuser
       this.router.post(`${this.routePath}/updateuser`,
            await this.mediatR.SendAsync<ValidationChain[],UpdateUserValidation>(new UpdateUserValidation()),
            this.UpdateUserAsync.bind(this)
       );

       // http://localhost:3000/api/user/deleteuser
       this.router.post(`${this.routePath}/removeuser`,
        await this.mediatR.SendAsync<ValidationChain[],RemoveUserValidation>(new RemoveUserValidation()),
        this.RemoveUserAsync.bind(this)
       );

       // http://localhost:3000/api/user/getallusers
       this.router.post(`${this.routePath}/getalluser`,this.GetAllUserAsync.bind(this));

    }

    

    private async CreateUserAsync(request:express.Request,response:express.Response,next:express.NextFunction): Promise<void>{

        try
        {
            console.log(this.routePath);
            const error=validationResult(request);

            if(!error.isEmpty()){
                response.status(200).json(error);
            }
            else
            {
                const {FirstName,LastName, Login:{UserName,Password}}=request.body;

                let result=await this.mediatR.SendAsync<string,CreateUserCommand>(new CreateUserCommand(FirstName,LastName,UserName,Password));

                response.status(200).json(result);
            }
        }
        catch(ex)
        {
            next(ex);
        }
    }
    private async UpdateUserAsync(request:express.Request,response:express.Response,next:express.NextFunction):Promise<void>{
        try
        {

            const error=validationResult(request);

            if(!error.isEmpty()){
                response.status(200).json(error);
            }
            else{
                const {UserIdentity,FirstName,LastName,Login:{UserName,Password}}=request.body;

                let result=await this.mediatR.SendAsync<boolean,UpdateUserCommand>(new UpdateUserCommand(UserIdentity,FirstName,LastName,UserName,Password));

                response.status(200).json(result);
            }
        
        }
        catch(ex)
        {
            next(ex);
        }
    }
    private async RemoveUserAsync(request:express.Request,response:express.Response,next:express.NextFunction):Promise<void>{
        try
        {

            const error=validationResult(request);

            if(!error.isEmpty()){
                response.status(200).json(error);
            }
            else{
                const {UserIdentity}=request.body;

                let result=await this.mediatR.SendAsync<boolean,RemoveUserCommand>(new RemoveUserCommand(UserIdentity));

                response.status(200).json(result);
            }
        
        }
        catch(ex)
        {
            next(ex);
        }
    }

    private async GetAllUserAsync(request:express.Request,response:express.Response,next:express.NextFunction):Promise<void>{
        try
        {
            let results=await this.mediatR.SendAsync<UserModel[],GetAllUsersQuery>(new GetAllUsersQuery());

            if(results!=null && results?.length>=1){
                response.status(200).json(results);
            }
            else
            {
                response.status(200).json({Error:"Record Not Found"});
            }
        }
        catch(ex)
        {
            next(ex);
        }
    }
}