import express from 'express';

import { getAllPosts, findById, postsCreate, deletePost, updatePost } from '../controllers/postsController.js';

const routes = express.Router();

routes.post('/posts/create', postsCreate)
routes.get('/posts/getAll', getAllPosts);
routes.get('/posts/findBy/:id', findById);
routes.delete('/posts/delete/:id', deletePost);
routes.put('/posts/update/:id', updatePost);

export default routes;
