
class ExpressError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = ExpressError;
// This class extends the built-in Error class to create a custom error type for handling HTTP errors