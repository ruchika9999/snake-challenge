const { error } = require("../utils/constant");
const { throwError } = require("../utils/helper");

const startValidation = (req, res, next) => {
  // Get game width and height from query parameters
  const width = parseInt(req.query.w);
  const height = parseInt(req.query.h);

  if (req.method !== "GET") {
    // Return a 405 error if the request method is not GET
    // return res.status(error.ERROR_405.CODE).send(error.ERROR_405.MESSAGE);
    return throwError(error.ERROR_405.MESSAGE, error.ERROR_405.CODE, next);
  }

  // Validate query parameters
  if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
    //  return res.status(error.ERROR_400.CODE).json(error.ERROR_400.MESSAGE);
    return throwError(error.ERROR_400.MESSAGE, error.ERROR_400.CODE, next);
  }

  next();
};

module.exports = { startValidation };
