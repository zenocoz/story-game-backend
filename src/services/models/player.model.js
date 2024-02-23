import mongoose from "mongoose";

const playerModel = new mongoose.Schema({
	nickname: { type: String, required: true },
	stories_contributed: [],
});

export default mongoose.models.players || mongoose.model("player", playerModel);
