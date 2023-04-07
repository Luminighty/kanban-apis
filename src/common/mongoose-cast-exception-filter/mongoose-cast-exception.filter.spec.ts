import { ArgumentsHost } from '@nestjs/common';
import { MongooseCastExceptionFilter } from './mongoose-cast-exception.filter';

describe('MongooseCastExceptionFilter', () => {
  let filter: MongooseCastExceptionFilter;
  let response;
  let host;

  beforeEach(() => {
    filter = new MongooseCastExceptionFilter();

    response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    host = {
      switchToHttp: jest.fn().mockReturnThis(),
      getResponse: () => response,
    };
  });

  it('should be defined', () => {
    expect(new MongooseCastExceptionFilter()).toBeDefined();
  });

  it('should catch Mongoose cast errors and return a formatted response', () => {
    const error = {
      name: 'CastError',
      kind: 'ObjectId',
      value: 'invalidObjectId',
      path: 'someField',
      reason: undefined,
    };

    filter.catch(error as any, host);
    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith({
      statusCode: 400,
      message: 'Invalid ID provided',
    });
  });
});
