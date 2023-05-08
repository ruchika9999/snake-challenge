const express = require("express");
const { error } = require("../utils/constant");
const {
  calculateNewVelocity,
  isInvalidMove,
  calculateNewHead,
  generateFruitPosition,
  isPositionColliding,
  newHeadIsEqualToFruitPosition,
} = require("../utils/helper");

const validate = (req, res, next) => {
  // Get the game state and ticks from the request body
  const { gameState, ticks } = req.body;

  // Create a copy of the game state
  // will update this copy and return it as the new game state

  const state = { ...gameState };

  // Check if the next move is valid
  const currentVelocity = state.velocity;
  const newVelocity = calculateNewVelocity(currentVelocity, ticks[0]);

  if (isInvalidMove(newVelocity)) {
    return res.status(error.ERROR_400.CODE).send(error.ERROR_400.MESSAGE);
  }

  // Calculate the new head position based on the current velocity
  const currentHead = state.snakePositions[0];
  const newHead = calculateNewHead(currentHead, currentVelocity);
  // Check if the new head position is out of bounds

  if (
    newHead.x < 0 ||
    newHead.x >= state.width ||
    newHead.y < 0 ||
    newHead.y >= state.height
  ) {
    // Set the game state to be game over and return a 418 error
    state.isGameOver = true;
    return res.status(error.ERROR_418.CODE).send(error.ERROR_418.MESSAGE);
  }

  // Check if the new head position is equal to the fruit position
  const fruitPosition = state.fruitPosition;

  if (newHead.x === fruitPosition.x && newHead.y === fruitPosition.y) {
    // If the snake has reached the fruit, generate a new fruit position
    state.fruitPosition = generateFruitPosition(state);
    // Add the new head to the snake positions array and update the score
    state.snakePositions.unshift(newHead);
    state.score += 1;
  } else {
    // If the snake has not reached the fruit, remove the
    //last position and add the new head to the positions array

    state.snakePositions.pop();
    state.snakePositions.unshift(newHead);
  }

  // Check if the new head position is colliding with any other part of the snake body
  if (isPositionColliding(state.snakePositions, newHead)) {
    // Set the game state to be game over and return a 418 error
    state.isGameOver = true;
    return res.status(error.ERROR_418.CODE).send(error.ERROR_418.MESSAGE);
  }

  // Check if the new head position is equal to the fruit position after the move
  if (newHeadIsEqualToFruitPosition(state)) {
    // Return a 404 error if the snake cannot reach the fruit position with the given ticks
    return res.status(error.ERROR_404.CODE).send(error.ERROR_404.MESSAGE);
  }

  res.status(200).json(state);
};

module.exports = { validate };
