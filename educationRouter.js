const educationRouter = require("express").Router();
const { logError, sendErrorResponse } = require("./utils");

const PATH = "/";
const ID_PATH = "/:id";

educationRouter.get(PATH, async (req, res) => {});

educationRouter.post(PATH, async (req, res) => {});

educationRouter.put(ID_PATH, async (req, res) => {});

educationRouter.delete(ID_PATH, async (req, res) => {});

module.exports = educationRouter;
