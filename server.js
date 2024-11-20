import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import routes from './src/routes/postsRoutes.js';

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
