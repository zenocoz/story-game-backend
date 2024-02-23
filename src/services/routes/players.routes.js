import playerModel from "../models/player.model.js";
import express from "express";

const playersRouter = express.Router();

playersRouter.get("/", async (req, res, next) => {
	console.log("GGGE");
	try {
		const players = await playerModel.find();
		res.send(players);
	} catch (error) {
		next(error);
	}
});

playersRouter.post("/add", async (req, res, next) => {
	try {
		const newPlayer = new playerModel(req.body);
		const { _id } = await newPlayer.save();

		res.status(201).send({ newPlayerId: _id });
	} catch (error) {
		console.log(error);
		next(error);
	}
});

playersRouter.get("/me", async (req, res, next) => {
	try {
		res.send(req.player);
	} catch (error) {
		next(err);
	}
});

playersRouter.put("/me", async (req, res, next) => {
	try {
		const updates = Object.keys(req.body);
		console.log("Updates ", updates);

		updates.forEach((update) => (req.player[update] = req.body[update]));
		await req.player.save();
		res.send(req.player);

		res.send(updates);
	} catch (error) {
		next(error);
	}
});

playersRouter.delete("/me", async (req, res, next) => {
	try {
		await req.player.deleteOne();
		res.status(204).send("Deleted");
	} catch (error) {
		next(error);
	}
});

export default playersRouter;
