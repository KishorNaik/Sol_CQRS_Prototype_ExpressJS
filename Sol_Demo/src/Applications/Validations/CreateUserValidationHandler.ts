import { rejects } from "assert/strict";
import { ValidationChain } from "express-validator";
import IRequest from "../../../Frameworks/MediatR/Core/Request/IRequest";
import IRequestHandler from "../../../Frameworks/MediatR/Core/Request/IRequestHandler";
import { UserValidationAbstract } from "./Abstracts/UserValidationAbstract";

export class CreateUserValidation implements IRequest<ValidationChain[]>{
       
}

export class CreateUserValidationHandler extends UserValidationAbstract implements IRequestHandler<CreateUserValidation,ValidationChain[]>{
    
    
    public HandleAsync(request: CreateUserValidation): Promise<ValidationChain[]> {
        
        return new Promise((resolve,reject)=>{
            try
            {
                let validationArray:ValidationChain[]=new Array();
                
                validationArray.push(
                this.FirstNameValidation(),
                this.LastNameValidation(),
                this.UserNameValidation(),
                this.PasswordValidation()
                );

                return resolve(validationArray);
            }
            catch(ex)
            {
                reject(ex);
                throw ex;
                
            }
            
        });
        
       
    }

}