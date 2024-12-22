import { CustomError } from './custom-error';

export class NotFoundError extends CustomError {
  reason = 'Not Found';
  statusCode: number = 404;

  constructor() {
    super('Not Found');

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors(): { message: string; field?: string }[] {
    return [{ message: this.reason }];
  }
}
