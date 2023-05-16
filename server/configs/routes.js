const {
	authenticationRoute,
	productRoute,
	cartRoute,
	orderRoute,
	userRoute,
} = require("#routes");

const routes = (app) => {
	app.get("/", (req, res) => {
		return res.send("Welcome to Toy Ecommerce server!");
	});

	/* -------------------- authenticate -------------------- */
	app.use("/api/v1", authenticationRoute);

	/* -------------------- product -------------------- */
	app.use("/api/v1", productRoute);

	/* -------------------- cart -------------------- */
	app.use("/api/v1", cartRoute);

	/* -------------------- user -------------------- */
	app.use("/api/v1", userRoute);

	/* -------------------- order -------------------- */
	app.use("/api/v1", orderRoute);
};

module.exports = routes;
