const express = require("express");
const router = express.Router();

const { newSnake } = require("../controllers/startController");
const { validate } = require("../controllers/validateController");

const { startValidation } = require("../middleWare/startValidation");
const { stepValidate } = require("../middleWare/stepValidation");

router.get("/new", startValidation, newSnake);
router.post("/validate", stepValidate, validate);

module.exports = router;
