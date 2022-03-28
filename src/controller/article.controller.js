/** @format */

import Article from "../models/article.model";
import { fileUpload } from "../helper/multer";
import { articleValidation } from "../validation/validation";

export const saveArticle = async (req, res, next) => {
	const { error } = articleValidation(req.body);
	if (error) return res.status(400).json({ message: error.details[0].message });
	if (req.file) {
		req.body.image = await fileUpload(req);
	} else {
		req.body.image =
			"https://images.app.goo.gl/KSrkEVNSfxm96ckT9";
	}
	const article = {
		cover: req.body.image,
		title: req.body.title,
		slug: req.body.content,
		author: req.body.author,
		content: req.body.author,
		status: false,
	};
	const newArticle = new Article(article);
	await newArticle.save();
	res.status(201).json({ success: true, data: newArticle });
};

export const getAllArticles = async (req, res) => {
	const articles = await Article.find();
	res.status(200).json({ success: true, data: articles });
};

export const getById = async (req, res) => {
	const { id } = req.params;
	const article = await Article.findById(id);
	if (!article)
		return res
			.status(404)
			.json({ success: false, message: "Article not found" });
	res.status(200).json({ success: true, data: article });
};

export const updateArticle = async (req, res) => {
	const { id } = req.params;

	const { error } = articleValidation(req.body);
	if (error) return res.status(400).json({ message: error.details[0].message });

	const updates = req.body;
	const article = await Article.findById(id);
	if (!article)
		return res
			.status(404)
			.json({ success: false, message: "Article not found" });
	await Article.findByIdAndUpdate(id, updates);
	res
		.status(200)
		.json({ success: true, message: "Article updated successfully" });
};

export const deleteArticleById = async (req, res) => {
	const id = req.params.id;
	const article = await Article.findById(id);
	if (!article)
		return res.status(404).json({ success: 404, message: "Article not found" });
	//await Article.findByIdAndDelete(id);
	const articleDelete = await Article.findByIdAndDelete(id);
	res.status(200).json({ success: 200, message: "Article deleted" });

	//return res.status(500).json({status: 500, message: "Internal server error!" });

};
  