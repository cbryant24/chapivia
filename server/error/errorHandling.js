function AppError(name, httpCode, description, isOperational) {
  Error.call(this);
  Error.captureStackTrace(this);
  this.name = name;
  //...other properties assigned here
};

AppError.prototype.__proto__ = Error.prototype;

module.exports.AppError = AppError;