import { listAllPosts, findByIdPost, createPosts } from "../modules/postsModules.js";

export async function postsCreate(req, res) {
  const { description, imageUrl, alt } = req.body;

  if (!description || !imageUrl || !alt) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const post = await createPosts(description, imageUrl, alt);

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