const error = {
  ERROR_418: {
    CODE: 418,
    MESSAGE: "Game is over, snake went out of bounds or made an invalid move.",
  },
  ERROR_404: {
    CODE: 404,
    MESSAGE:
      "Fruit not found, the ticks do not lead the snake to the fruit position.",
  },
  ERROR_400: {
    CODE: 400,
    MESSAGE: "Invalid request.",
  },
  ERROR_405: {
    CODE: 405,
    MESSAGE: "Invalid method.",
  },
  ERROR_500: {
    CODE: 500,
    MESSAGE: "Internal server error.",
  },
};

const tickOptions = ["left" , "right", "up", "down" ]

module.exports = { error , tickOptions };
