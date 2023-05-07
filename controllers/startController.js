const express = require("express");
const { generateGameId } = require("../utils/helper");

const newSnake = (req, res) => {

  
  const width = parseInt(req.query.w);
  const height = parseInt(req.query.h);
  // Generate random fruit position
  const fruit = {
    x: Math.floor(Math.random() * width),
    y: Math.floor(Math.random() * height),
  };

  // Create initial game state
  const gameState = {
    gameId: generateGameId(),
    width: width,
    height: height,
    score: 0,
    fruit,
    snakePositions: [{ x: 0, y: 0 }], // snake starts at (0, 0) moving right
    velocity: { x: 1, y: 0 },
  };

  // Return initial game state
  res.status(200).json(gameState);
};

module.exports = { newSnake };
