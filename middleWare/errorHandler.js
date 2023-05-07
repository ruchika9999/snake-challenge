const { error } = require("../utils/constant");

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode ?? 500;

  switch (statusCode) {
    case error.ERROR_400.CODE:
      return res.status(statusCode).json({
        message: error.ERROR_400.MESSAGE,
      });
    case error.ERROR_404.CODE:
      return res.status(statusCode).json({ message: error.ERROR_404.MESSAGE });
    case error.ERROR_405.CODE:
      return res.status(statusCode).json({
        message: error.ERROR_405.MESSAGE,
      });
    case error.ERROR_418.CODE:
      return res.status(statusCode).json({ message: error.ERROR_418.MESSAGE });
    case error.ERROR_500.CODE:
      return res.status(statusCode).json({ message: error.ERROR_500.MESSAGE });
    default:
      console.log(error.ERROR_500.MESSAGE, err);
      break;
  }
};

module.exports = { errorHandler };
