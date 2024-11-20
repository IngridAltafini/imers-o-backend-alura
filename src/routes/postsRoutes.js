import express from 'express';

import { getAllPosts, findById } from '../controllers/postsController.js';

const routes = express.Router();

routes.get('/posts', getAllPosts);
routes.get('/posts/:id', findById);

export default routes;
