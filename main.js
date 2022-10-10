const router = require("express").Router();
const Joi = require("joi");
const { experienceService, educationService } = require("./services");
const { logError } = require("./utils");
const schemas = require("./schemas");

// middleware
const timestamp = (req, res, next) => {
	console.log("Incoming request...", req.originalUrl, "From:", req.ip);
	console.log("TIMESTAMP", Date());
	console.log("----------");
	next();
};

router.use(timestamp);

// api base router
router.get("/", (req, res) => {
	try {
		res.status(200).json({ apiStatus: "running" });
	} catch (e) {
		logError(req, e);
		res.status(500).json({
			apiStatus: "not running",
			path: req.originalUrl,
		});
	}
});

router.get("/experience", async (req, res) => {
	try {
		const data = await experienceService.readExperience();
		res.status(200).json(data);
	} catch (e) {
		logError(req, e);
		res.status(500).json({
			message: "server error",
			path: req.originalUrl,
		});
	}
});

router.post("/experience", async (req, res) => {
	console.log("made it here");
	try {
		// validate
		const validatedData = await schemas.experienceAdd.validateAsync(
			req.body
		);
		const dataWritten = await experienceService.writeExperience(req.body);
		res.status(201).json({
			message: "new experience added",
			...dataWritten,
		});
	} catch (e) {
		logError(req, e);
		res.status(500).json({
			message: "server error",
			path: req.originalUrl,
		});
	}
});

router.put("/experience", async (req, res) => {
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
		res.status(500).json({
			message: "server error",
			path: req.originalUrl,
		});
	}
});

router.delete("/experience", async (req, res) => {
	try {
		// validate
		const validatedData = await schemas.experienceDelete.validateAsync(
			req.body
		);
		const deleted = await experienceService.deleteExperience(validatedData);
		if (deleted) {
			return res.status(200).json({
				message: "experience deleted succesfully",
				id: validatedData.id,
			});
		}
		res.status(400).json({
			message: "no experience with ID " + req.body.id,
		});
	} catch (e) {
		logError(req, e);
		res.status(500).json({
			message: "server error",
			path: req.originalUrl,
		});
	}
});

router.get("/education", async (req, res) => {
	try {
		const data = await educationService.readEducation();
		res.status(200).json(data);
	} catch (e) {
		logError(req, e);
		res.status(500).json({
			message: "server error",
			path: req.originalUrl,
		});
	}
});

module.exports = router;
// exports.router = router;
