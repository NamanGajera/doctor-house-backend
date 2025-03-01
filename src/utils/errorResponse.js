class ErrorResponse extends Error {
    constructor(message, statusCode, errors = []) {
      super(message);
      this.message = message;
      this.statusCode = statusCode;
      this.errors = errors;

      
    }
  }
  
  module.exports = ErrorResponse;