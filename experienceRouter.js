const experienceRouter = require("express").Router();
const experienceService = require("./services/experience");
const { logError, sendErrorResponse } = require("./utils");
const schemas = require("./schemas/experience");

const PATH = "/";
const ID_PATH = "/:id";
experienceRouter.get(PATH, async (req, res) => {
	try {
		const data = await experienceService.readExperience();
		res.status(200).json(data);
	} catch (e) {
		logError(req, e);
		sendErrorResponse(e, req, res);
	}
});

experienceRouter.post(PATH, async (req, res) => {
	console.log("made it here");
	try {
		// validate
		const validatedData = await schemas.experienceAdd.validateAsync(
			req.body
		);
		const dataWritten = await experienceService.writeExperience(
			validatedData
		);
		res.status(201).json({
			message: "NEW EXPERIENCE ADDED",
			...dataWritten,
		});
	} catch (e) {
		logError(req, e);
		sendErrorResponse(e, req, res);
	}
});

experienceRouter.put(ID_PATH, async (req, res) => {
	const { id } = req.params;
	if (!id) {
		return res.status(400).json({
			message: "MISSING ID",
		});
	}
	try {
		// validate
		const validatedData = await schemas.experienceUpdate.validateAsync({
			...req.body,
			id,
		});
		const updatedData = await experienceService.updateExperience(
			validatedData
		);
		if (updatedData) {
			return res.status(200).json({
				message: "UPDATED SUCCESSFULLY",
				updatedData,
			});
		}
		res.status(400).json({
			message: "NO MATCHING ID " + id,
		});
	} catch (e) {
		logError(req, e);
		sendErrorResponse(e, req, res);
	}
});

experienceRouter.delete(ID_PATH, async (req, res) => {
	const { id } = req.params;
	if (!id) {
		return res.status(400).json({
			message: "MISSING ID",
		});
	}
	try {
		// validate
		const validatedData = await schemas.experienceDelete.validateAsync({
			...req.body,
			id,
		});
		const deleted = await experienceService.deleteExperience(validatedData);
		if (deleted) {
			return res.status(200).json({
				message: "DELETED SUCCESSFULLY",
				deleted,
			});
		}
		res.status(400).json({
			message: "NO MATCHING ID " + id,
		});
	} catch (e) {
		logError(req, e);
		sendErrorResponse(e, req, res);
	}
});

module.exports = experienceRouter;
