const { authenticationRoute, productRoute } = require("#routes");

const routes = (app) => {
	app.get("/", (req, res) => {
		return res.send("Welcome to Toy Ecommerce server!");
	});

	/* -------------------- authenticate -------------------- */
	app.use("/api/v1", authenticationRoute);

	/* -------------------- product -------------------- */
	app.use("/api/v1", productRoute);
};

module.exports = routes;
