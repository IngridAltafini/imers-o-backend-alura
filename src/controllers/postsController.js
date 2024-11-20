import { listAllPosts, findByIdPost } from "../modules/postsModules.js";

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