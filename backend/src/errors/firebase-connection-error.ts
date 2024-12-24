import { CustomError } from './custom-error';

export class FirebaseConnectionError extends CustomError {
  reason = 'Error connecting to Firebase';
  statusCode = 500;
  constructor() {
    super('Error connecting to Firebase');
    // Only because we are extending a built in class
    Object.setPrototypeOf(this, FirebaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
