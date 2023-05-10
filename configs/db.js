const mongoose = require("mongoose");
module.exports = async () => {
	await mongoose
		.connect(process.env.MONGODB_URL)
		.then(() => {
			console.log("Connected to mongodb");
		})
		.catch((err) => {
			console.log(err);
		});
};
