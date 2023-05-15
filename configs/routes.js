const { authenticationRoute, productRoute, cartRoute } = require("#routes");

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
};

module.exports = routes;
