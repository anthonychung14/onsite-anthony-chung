const { HttpError } = require('./errors');

function errorHandler(err, req, res, next) {
  if (!err) {
    next();
  } else if (err instanceof HttpError) {
    res.status(err.code).json({ error: err.message });
  } else {
    res
      .status(500)
      // NOTE: we don't want to show server errors to the user
      .json({ error: 'Oops! Something went wrong' });
  }
}

module.exports = { errorHandler };
