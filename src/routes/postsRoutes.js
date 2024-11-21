import express from 'express';
import multer from 'multer';

import { getAllPosts, findById, postsCreate, deletePost, updatePost, uploadImage } from '../controllers/postsController.js';

const upload = multer({ dest: "./uploads" })
const routes = express.Router();

routes.post('/posts/create', postsCreate)
routes.get('/posts/getAll', getAllPosts);
routes.get('/posts/findBy/:id', findById);
routes.delete('/posts/delete/:id', deletePost);
routes.put('/posts/update/:id', updatePost);

routes.post('/posts/upload', upload.single("image"), uploadImage)

export default routes;
