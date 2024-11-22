import express from 'express';
import multer from 'multer';
import cors from 'cors';

import { getAllPosts, findById, postsCreate, deletePost, updatePost, uploadImage } from '../controllers/postsController.js';

const corsOptions = {
  origin: 'https://localhost:8000',
  optionsSuccessStatus: 200,
}

const upload = multer({ dest: "./uploads" })
const routes = express.Router();
app.use(cors(corsOptions));

routes.post('/posts/create', postsCreate)
routes.get('/posts/getAll', getAllPosts);
routes.get('/posts/findBy/:id', findById);
routes.delete('/posts/delete/:id', deletePost);
routes.put('/posts/update/:id', updatePost);

routes.post('/posts/upload', upload.single("image"), uploadImage)

export default routes;
