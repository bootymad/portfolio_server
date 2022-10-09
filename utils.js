const logError = (req, e) => {
	console.log(req.originalUrl, e);
	console.log("----------");
};

module.exports = { logError };
