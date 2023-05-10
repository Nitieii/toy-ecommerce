const { authenticationRoute } = require("#routes");

const routes = (app) => {
	app.get("/", (req, res) => {
		return res.send("Welcome to Toy Ecommerce server!");
	});

	/* -------------------- authenticate -------------------- */
	app.use("/api/v1", authenticationRoute);
};

module.exports = routes;
