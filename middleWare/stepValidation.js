const { error } = require("../utils/constant");
const { throwError } = require("../utils/helper");
const { tickOptions } = require("../utils/constant");

const stepValidate = (req, res, next) => {
  const { gameState } = req.body;

  const width = parseInt(gameState.width);
  const height = parseInt(gameState.height);

  const ticks = req.body.ticks;

  // Check if the request method is POST
  if (req.method !== "POST") {
    // Return a 405 error if the request method is not POST
    return throwError(error.ERROR_405.MESSAGE, error.ERROR_405.CODE, next);
  }

  if (
    isNaN(width) ||
    isNaN(height) ||
    width <= 0 ||
    height <= 0 ||
    !tickOptions.includes(ticks[0])
  ) {
    return res.status(error.ERROR_400.CODE).json(error.ERROR_400.MESSAGE);
  }
  // Check if the game is already over
  if (gameState.isGameOver) {
    // Return a 418 error if the game is over
    return throwError(error.ERROR_418.MESSAGE, error.ERROR_418.CODE, next);
  }

  next();
};

module.exports = { stepValidate };
