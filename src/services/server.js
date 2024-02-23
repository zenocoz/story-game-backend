import express from "express";
import { connect } from "./DB/connection.js";
import listEndpoints from "express-list-endpoints";
import playersRoutes from "./routes/players.routes.js";
import storiesRoutes from "./routes/stories.routes.js";
import cors from "cors";

// const {
// 	notFoundHandler,
// 	badRequestHandler,
// 	genericErrorHandler,
// } = require("./errorHandlers");

const server = express();

var whitelist = ["http://localhost:3003", "http://localhost:8082"];
var corsOptions = {
	origin: function (origin, callback) {
		if (whitelist.indexOf(origin) !== 1) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
};

server.use(cors(corsOptions));

const port = process.env.PORT || 8080;

server.use(express.json());

//ROUTES

server.use("/players", playersRoutes);
server.use("/stories", storiesRoutes);

// ERROR HANDLERS
// server.use(badRequestHandler);
// server.use(notFoundHandler);
// server.use(genericErrorHandler);

console.log(listEndpoints(server));

connect()
	.then(() => {
		try {
			server.listen(port, () => {
				console.log(`Server connected to http://localhost:${port}`);
			});
		} catch (error) {
			console.log("cannot connect to the server");
		}
	})
	.catch((error) => {
		console.log("Invalid database connection");
	});
