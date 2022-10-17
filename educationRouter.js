const educationRouter = require("express").Router();
const educationService = require("./services/education");
const schemas = require("./schemas/education");
const { logError, sendErrorResponse } = require("./utils");

const PATH = "/";
const ID_PATH = "/:id";

educationRouter.get(PATH, async (req, res) => {
	try {
		const data = await educationService.readEducation();
		res.status(200).json(data);
	} catch (e) {
		logError(req, e);
		sendErrorResponse(e, req, res);
	}
});

educationRouter.post(PATH, async (req, res) => {
	try {
		// validate
		const validatedData = await schemas.educationAdd.validateAsync(
			req.body
		);
		// write
		const dataWritten = await educationService.writeEducation(
			validatedData
		);
		res.status(201).json({
			message: "NEW EDUCATION ADDED",
			...dataWritten,
		});
	} catch (e) {
		logError(req, e);
		sendErrorResponse(e, req, res);
	}
});

educationRouter.put(ID_PATH, async (req, res) => {});

educationRouter.delete(ID_PATH, async (req, res) => {});

module.exports = educationRouter;
