const router = require("express").Router();
const experienceRouter = require("./experienceRouter");
const { logError, timestamp } = require("./utils");

// middleware
router.use(timestamp);
router.use("/experience", experienceRouter);

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

router.use((err, req, res, next) => {
	if (err) {
		console.log("ERROR");
		res.status(400).json({ message: "INVALID ROUTE" });
	}
});

module.exports = router;
// exports.router = router;
