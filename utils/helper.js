const generateGameId = () => {
  return Math.random().toString(36).substring(2, 8);
};

const calculateNewVelocity = (currentVelocity, directionChange) => {
  const { x, y } = currentVelocity;

  switch (directionChange) {
    case "left":
      return x === 0 ? { x: -1, y: 0 } : null;
    case "right":
      return x === 0 ? { x: 1, y: 0 } : null;
    case "up":
      return y === 0 ? { x: 0, y: -1 } : null;
    case "down":
      return y === 0 ? { x: 0, y: 1 } : null;
    default:
      return null;
  }
};

const isInvalidMove = (newVelocity) => newVelocity === null;

const calculateNewHead = (head, velocity) => {
  const newHead = {
    x: head.x + velocity.x,
    y: head.y + velocity.y,
  };

  return newHead;
};

const generateFruitPosition = (gameState) => {
  const x = Math.floor(Math.random() * gameState.width);
  const y = Math.floor(Math.random() * gameState.height);
  // Check if the new fruit position is already occupied by a snake part
  const isOccupied = gameState.snakePositions.some(
    (part) => part.x === x && part.y === y
  );

  // If the position is not occupied, return it as the new fruit position
  if (!isOccupied) {
    return { x, y };
  }

  // If the position is occupied, recursively call the function until an unoccupied position is found
  return generateFruitPosition(gameState);
};

const isPositionColliding = (snakePositions, newHead) => {
  const snakeBody = snakePositions.slice(1);
  return snakeBody.some((part) => part.x === newHead.x && part.y === newHead.y);
};

const newHeadIsEqualToFruitPosition = (gameState) => {
  const snakeBody = gameState.snakePositions.slice(1);
  const fruitPositionAfterMove = gameState.fruitPosition;

  return snakeBody.some(
    (part) =>
      part.x === fruitPositionAfterMove.x && part.y === fruitPositionAfterMove.y
  );
};

const throwError = (errorMessage, code, next) => {
  let error = new Error(errorMessage);
  error.statusCode = code;
  next(error);
};

module.exports = {
  generateGameId,
  calculateNewVelocity,
  isInvalidMove,
  calculateNewHead,
  generateFruitPosition,
  isPositionColliding,
  newHeadIsEqualToFruitPosition,
  throwError
};
