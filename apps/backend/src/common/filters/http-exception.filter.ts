/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let errors: any[] | undefined;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'object') {
        const { message: msg, error } = exceptionResponse as any;
        message = msg || message;

        if (error === 'Bad Request' && (exceptionResponse as any).message) {
          errors = (exceptionResponse as any).message;
          if (!Array.isArray(errors)) {
            errors = [errors];
          }
        } else if ((exceptionResponse as any).errors) {
          errors = (exceptionResponse as any).errors;
        }
      } else {
        message = exceptionResponse;
      }
    } else if (exception.name === 'ValidationError') {
      status = HttpStatus.BAD_REQUEST;
      message = 'Validation failed';
      errors = Object.entries(exception.errors).map(([field, err]: any) => ({
        field,
        messages: [err.message],
      }));
    } else if (exception.name === 'CastError') {
      status = HttpStatus.BAD_REQUEST;
      message = 'Invalid ID format';
      errors = [
        {
          field: 'id',
          messages: ['Invalid MongoDB ID'],
        },
      ];
    } else if (exception.code === 11000) {
      status = HttpStatus.CONFLICT;
      message = 'Duplicate field value';
      const field = Object.keys(exception.keyPattern)[0];
      errors = [
        {
          field,
          messages: [`${field} already exists`],
        },
      ];
    } else {
      message = exception.message || message;
    }

    response.status(status).json({
      success: false,
      message,
      result: null,
      ...(errors && { errors }),
    });
  }
}
