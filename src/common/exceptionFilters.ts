import {
  ArgumentsHost, Catch, ExceptionFilter,
  HttpException,
} from '@nestjs/common';

import { QueryFailedError } from 'typeorm';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';

const ERROR_CODE_ENTITY_NOT_FOUND = 'ERROR_CODE_ENTITY_NOT_FOUND';
const ERROR_CODE_FOREIGN_KEY = 'ERROR_CODE_FOREIGN_KEY';
const ERROR_CODE_DUPLICATE_UNIQUE = 'ERROR_CODE_DUPLICATE_UNIQUE';

const QUERY_FAILED_ERROR_CODE_F_KEY = '23503';
const QUERY_FAILED_ERROR_CODE_DUPLICATE_UNIQUE = '23505';

interface IResponse {
  message: string;
  details?: string;
  error: string;
  timestamp: string;
  path: string;
}

const referencedMessage = (entity: string, parent: string): string =>
  parent
    ?
    `Can't delete the "${entity}" that is used in the "${parent}"`
    :
    `Cannot set reference in ${entity} - foreign constraint violated`;

class BaseExceptionFilter implements ExceptionFilter {
  getResponse(defaultResponse: IResponse, exception: Error): object {
    return defaultResponse;
  }

  getCustomStatus(exception: Error) {
    return 500;
  }

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const req = ctx.getRequest();

    const { message, name } = exception;

    const defaultResponse: IResponse = {
      message,
      error: name,
      timestamp: new Date().toISOString(),
      path: req.url,
    };

    console.log('BaseExceptionFilter: exception caught');
    console.log(defaultResponse);
    exception.stack && console.log(exception.stack);

    const response = this.getResponse(
      defaultResponse,
      exception
    );

    res
      .status(this.getCustomStatus(exception))
      .json(response);
  }
}

@Catch(HttpException)
class HttpExceptionFilter extends BaseExceptionFilter {
  getCustomStatus(exception: Error) {
    return (<HttpException>exception).getStatus();
  }

  getResponse(defaultResponse: IResponse, exception: Error) {
    const { timestamp, path } = defaultResponse;
    return Object.assign(
      (<HttpException>exception).getResponse(),
      { timestamp, path }
    );
  }
}

@Catch(EntityNotFoundError)
class EntityNotFoundFilter extends BaseExceptionFilter {

  getCustomStatus(exception: Error) {
    return 404;
  }

  getResponse(defaultResponse: IResponse, exception: Error) {
    return Object.assign(
      defaultResponse,
      { errorCode: ERROR_CODE_ENTITY_NOT_FOUND },
    );
  }
}

@Catch(QueryFailedError)
class QueryFailedErrorFilter extends BaseExceptionFilter {

  getCustomStatus(exception: Error) {
    return 400;
  }

  getResponse(defaultResponse: IResponse, exception: Error) {
    const code = exception['code'];
    const result: any = {};

    switch (code) {
      case QUERY_FAILED_ERROR_CODE_F_KEY:
        const [entity, , parent] = exception.message.match(/"(\w*)"/g);
        result.message = referencedMessage(entity, parent);
        result.errorCode = ERROR_CODE_FOREIGN_KEY;
        break;
      case QUERY_FAILED_ERROR_CODE_DUPLICATE_UNIQUE:
        result.errorCode = ERROR_CODE_DUPLICATE_UNIQUE;
        break;
    }

    return Object.assign(defaultResponse, result);
  }
}

@Catch()
class InternalServerErrorFilter extends BaseExceptionFilter { }

export const getFilters = () =>
  [
    new InternalServerErrorFilter(),
    new HttpExceptionFilter(),
    new EntityNotFoundFilter(),
    new QueryFailedErrorFilter(),
  ];
