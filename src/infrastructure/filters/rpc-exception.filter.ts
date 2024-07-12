import {
  ArgumentsHost,
  Catch,
  Logger,
  RpcExceptionFilter,
} from "@nestjs/common";
import { RmqContext, RpcException } from "@nestjs/microservices";
import { Observable, throwError } from "rxjs";

@Catch(RpcException)
export class AllExceptionsRpcFilter
  implements RpcExceptionFilter<RpcException>
{
  private readonly logger: Logger = new Logger(AllExceptionsRpcFilter.name);
  catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
    const request: RmqContext = host.switchToRpc().getContext();
    const data = host.switchToRpc().getData();
    const originalUrl = request.getPattern();
    const errors = exception.getError();
    const objToLog = {
      error: errors,
      originalUrl: originalUrl,
      data: data,
    };
    this.logger.error(`RpcExceptionFilter/${originalUrl}`, objToLog);
    return throwError(() => objToLog);
  }
}
