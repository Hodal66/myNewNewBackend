import express from "express";
import articles from "./api/article.route";
import { router as blog } from "./api/blogRoutes.js";
import { router as auth } from "./api/auth"
import { router as contact } from "./api/contactRoute.js";

const routes=express.Router();
routes.use('/users',articles);
routes.use('/blogs',contact);
// routes.use('/contacts',auth);
routes.use('/articles',blog);

export default routes;