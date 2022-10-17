const fs = require("fs/promises");
const path = require("path");

const logError = (req, e) => {
	console.log(req.originalUrl, e);
	console.log("----------");
};

const timestamp = (req, res, next) => {
	console.log(
		"Incoming " + req.method + " request...",
		req.originalUrl,
		"From:",
		req.ip
	);
	console.log("QUERY", req.query);
	console.log("PARAMS", req.params);
	console.log("TIMESTAMP", Date());
	console.log("----------");
	next();
};

const writeToFile = async (data, filePath) => {
	await fs.writeFile(path.join(process.cwd(), filePath), data);
};

const readFile = async (filePath) => {
	return await fs.readFile(path.join(process.cwd(), filePath), "utf-8");
};

const sendErrorResponse = (error, req, res) => {
	// joi errors have a details property
	error.details
		? res.status(400).json({
				error: error.details[0].message,
				path: req.originalUrl,
		  })
		: res.status(500).json({
				error: "Server Error",
				path: req.originalUrl,
		  });
};
module.exports = {
	logError,
	timestamp,
	writeToFile,
	sendErrorResponse,
	readFile,
};
