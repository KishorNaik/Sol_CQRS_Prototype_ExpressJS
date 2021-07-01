import IRequest from "./IRequest";

export default interface IRequestHandler<TRequest extends IRequest<TReturnType>,TReturnType>{
    HandleAsync(request:TRequest):Promise<TReturnType>
}
 