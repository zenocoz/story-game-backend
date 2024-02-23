import { Router } from "express";
import StoryModel from "../models/story.model.js";

const router = Router();

router.post("/", async (req, res, next) => {
	try {
		const sentences = [];
		sentences.push(req.body.sentence);
		const storyInitialValues = {
			title: req.body.title,
			numberOfSentences: req.body.numberOfSentences,
			sentences,
			topic: req.body.topic,
		};

		const { _id } = await new StoryModel(storyInitialValues).save();

		res.status(201).send({ "new story added with id:": _id });
	} catch (error) {
		next(error);
	}
});

router.get("/", async (req, res, next) => {
	try {
		const stories = await StoryModel.find({});
		if (stories) {
			res.send(stories);
		} else {
			console.log("didn't find any stories. Console logging request: ", req);
		}
	} catch (error) {
		next(error);
	}
});

router.put("/:storyId", async (req, res, next) => {
	console.log(req.body);
	try {
		const story = await StoryModel.findOneAndUpdate(
			{
				_id: req.params.storyId,
			},
			{
				$push: {
					sentences: req.body.sentence,
				},
			}
		);
		res.send({ "story updated correctly": story });
	} catch (err) {
		console.log(err);
		next(err);
	}
});

export default router;
