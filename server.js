import express from 'express';

const posts = [
  {
    id: 1,
    description: 'sla eu',
    image: 'https://placecats.com/millie/300/150'
  },
  {
    id: 2,
    description: 'adipisicing',
    image: 'https://placecats.com/millie/300/150'
  },
  {
    id: 3,
    description: 'occaecat',
    image: 'https://placecats.com/millie/300/150'
  },
  {
    id: 4,
    description: 'aliqua',
    image: 'https://placecats.com/millie/300/150'
  }
]

const app = express();

app.use(express.json())

app.listen(3000, () => {
  console.log('Server is running on port 3000');
})

app.get('/posts', (req, res) => {
  res.status(200).json(posts);
});

function buscarPostPorID(id) {
  return posts.findIndex((post) => {
    return post.id === Number(id)
  })
}

app.get('/posts/:id', (req, res) => {
  const index = buscarPostPorID(req.params.id);
  res.status(200).json(posts[index]);
});