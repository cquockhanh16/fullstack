class HttpError extends Error {
  constructor(mes, code) {
    super(mes);
    this.errorCode = code;
  }
}

module.exports = HttpError;
