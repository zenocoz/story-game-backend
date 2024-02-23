import mongoose from "mongoose";

const sentenceSchema = new mongoose.Schema({
	contributor: {
		type: mongoose.Schema.ObjectId,
		ref: "player",
		required: true,
	},
	nickname: { type: String, required: true },
	sentence: { type: String, required: true },
});

const storyModel = new mongoose.Schema({
	title: { type: String, required: true },
	numberOfSentences: { type: Number, default: 10 },
	sentences: [sentenceSchema],
	topic: { type: String, default: "general" },
});

export default mongoose.models.stories || mongoose.model("story", storyModel);
