const router = require("express").Router();
const experienceRouter = require("./experienceRouter");
const educationRouter = require("./educationRouter");
const { logError, timestamp } = require("./utils");

// middleware
router.use(timestamp);
router.use("/experience", experienceRouter);
router.use("/education", educationRouter);

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

router.use((req, res) => {
	res.status(400).json({
		message: "INVALID API REQUEST",
		request: `${req.originalUrl} - ${req.method}`,
	});
});

module.exports = router;
// exports.router = router;
