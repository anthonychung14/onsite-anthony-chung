class HttpError extends Error {}

class Http400 extends HttpError {
  constructor(...params) {
    super(...params);
    this.code = 400;
  }
}

class Http404 extends HttpError {
  constructor(...params) {
    super(...params);
    this.code = 404;
  }
}

module.exports = {
  Http400,
  Http404,
};
