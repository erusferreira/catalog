export class AuthError extends Error {
  constructor(msg: string) {
    super(msg);
    Object.setPrototypeOf(this, AuthError.prototype);
  }
}

export class AuthForbiddenError extends AuthError {
  constructor() {
    super("Forbidden");
    Object.setPrototypeOf(this, AuthForbiddenError.prototype);
  }
}

export class BusinessError extends Error {
  constructor(msg: string) {
    super(msg);
    Object.setPrototypeOf(this, BusinessError.prototype);
  }
}
