const experienceRouter = require("express").Router();
const { experienceService } = require("./services");
const { logError, sendErrorResponse } = require("./utils");
const schemas = require("./schemas");

const PATH = "/";
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
			message: "new experience added",
			...dataWritten,
		});
	} catch (e) {
		logError(req, e);
		sendErrorResponse(e, req, res);
	}
});

experienceRouter.put(PATH, async (req, res) => {
	try {
		// validate
		const validatedData = await schemas.experienceUpdate.validateAsync(
			req.body
		);
		const updatedData = await experienceService.updateExperience(
			validatedData
		);
		if (updatedData) {
			return res.status(200).json({
				message: "experience updated succesfully",
				updatedData,
			});
		}
		res.status(400).json({
			message: "no experience with ID " + req.body.id,
		});
	} catch (e) {
		logError(req, e);
		sendErrorResponse(e, req, res);
	}
});

experienceRouter.delete(PATH, async (req, res) => {
	try {
		// validate
		const validatedData = await schemas.experienceDelete.validateAsync(
			req.body
		);
		const deleted = await experienceService.deleteExperience(validatedData);
		if (deleted) {
			return res.status(200).json({
				message: "experience deleted succesfully",
				deleted,
			});
		}
		res.status(400).json({
			message: "no experience with ID " + req.body.id,
		});
	} catch (e) {
		logError(req, e);
		sendErrorResponse(e, req, res);
	}
});

module.exports = experienceRouter;
