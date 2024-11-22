import fs from 'fs';

import { listAllPosts, findByIdPost, createPosts, deleteByIdPost, updatePostInDb } from "../modules/postsModules.js";
import generateDescriptionWithGemini from "../services/geminiService.js"

export async function postsCreate(req, res) {
  const newPosts = req.body;

  try {
    const post = await createPosts(newPosts);

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create post', details: error.message });
  }
}

export async function getAllPosts(req, res) {
  const posts = await listAllPosts()

  res.status(200).json(posts);
}

export async function findById(req, res) {
  const post = await findByIdPost(req.params.id)

  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }

  res.status(200).json(post);
}

export async function deletePost(req, res) {
  const result = await deleteByIdPost(req.params.id)

  if (result.deletedCount === 0) {
    return res.status(404).json({ error: 'Post not found' });
  }

  res.status(200).json({ message: 'Post deleted successfully' });
}

export async function updatePost(req, res) {
  const { id } = req.params;
  const urlImage = `http://localhost:3333/${id}.png`

  try {
    const imageBuffer = fs.readFileSync(`uploads/${id}.png`)
    const description = await generateDescriptionWithGemini(imageBuffer)

    const updateData = {
      description: description,
      imageUrl: urlImage,
      alt: req.body.alt
    };

    const result = await updatePostInDb(id, updateData);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to upadte post', details: error.message })
  };
}

export async function uploadImage(req, res) {
  const newPosts = {
    description: "",
    imageUrl: req.file.originalname,
    alt: ""
  };

  try {
    const post = await createPosts(newPosts);

    const postId = post.data._id;

    const image = `uploads/${postId}.png`;
    fs.renameSync(req.file.path, image);

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create post', details: error.message });
  }
}
