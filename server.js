const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const compression = require("compression");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const { createServer } = require("http");

const { db } = require("./configs");

dotenv.config();

db();

const app = express();
const PORT = process.env.PORT;

// Create http server
const httpServer = createServer(app);

/* ------------------------ cors ------------------------ */
app.use(cors());

app.use(express.json({ limit: "7mb" }));
app.use(
	express.urlencoded({ limit: "7mb", extended: true, parameterLimit: 50000 })
);

/* --- sanitize mongo queries data (prevent injection) -- */
app.use(mongoSanitize());

/* ------------ Data sanitization against XSS ----------- */
// app.use(xss());

/* --------------- compress response body --------------- */
app.use(compression());

/* ----- secure app by setting various HTTP headers ----- */
app.use(helmet());

httpServer.listen(PORT, () => {
	console.log(`Server is running at ${PORT}`);
});
