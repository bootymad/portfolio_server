const fs = require("fs/promises");
const path = require("path");

const logError = (req, e) => {
	console.log(req.originalUrl, e);
	console.log("----------");
};

const timestamp = (req, res, next) => {
	console.log("Incoming request...", req.originalUrl, "From:", req.ip);
	console.log("TIMESTAMP", Date());
	console.log("----------");
	next();
};

const writeToFile = async (data, filePath) => {
	await fs.writeFile(path.join(process.cwd(), filePath), data);
};

const sendErrorResponse = (error, req, res) => {
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
module.exports = { logError, timestamp, writeToFile, sendErrorResponse };
