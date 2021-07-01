import {check,ValidationChain,validationResult } from "express-validator";



export abstract class UserValidationAbstract{

    protected UserIdentityValidation():ValidationChain{
        return check('UserIdentity').isMongoId();
    }

    protected FirstNameValidation():ValidationChain{
        return check('FirstName').isLength({min:2}).withMessage("First Name must be at least 2 char long");
    }

    protected LastNameValidation():ValidationChain{
        return check('LastName').isLength({min:2}).withMessage("Last Name must be at least 2 char long");
    }

    protected UserNameValidation():ValidationChain{
        return check("Login.UserName").isEmail();
    }

    protected PasswordValidation():ValidationChain{
        return check("Login.Password").isLength({min:5}).withMessage("Password must be at least 5 char long");
    }

    
}