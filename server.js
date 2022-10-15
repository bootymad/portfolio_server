const express = require("express");
const app = express();
const port = 3000;

// const { router: apiMainRouter } = require("./main");
const apiMainRouter = require("./main");

// middleware
app.use(express.json());
app.use("/api", apiMainRouter);
app.use((req, res) => {
	res.status(400).json({
		message: "INVALID REQUEST",
		request: `${req.originalUrl} - ${req.method}`,
	});
});
app.use((err, req, res, next) => {
	if (err) {
		console.log("ERROR");
		res.status(400).json({ message: "Invalid Data", data: req.body });
	}
});

app.listen(port, () =>
	console.log("Portfolio server listening on port " + port)
);
