import express from 'express';

import { getAllPosts, findById, postsCreate } from '../controllers/postsController.js';

const routes = express.Router();

routes.post('/posts/create', postsCreate)
routes.get('/posts/getAll', getAllPosts);
routes.get('/posts/findBy/:id', findById);

export default routes;
