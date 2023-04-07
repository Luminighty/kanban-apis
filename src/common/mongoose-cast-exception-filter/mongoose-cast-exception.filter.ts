import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Error } from 'mongoose';
import { Response } from 'express';

@Catch(Error.CastError)
export class MongooseCastExceptionFilter implements ExceptionFilter {
  catch(error: Error.CastError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    response.status(400).json({
      statusCode: 400,
      message: 'Invalid ID provided',
    });
  }
}
