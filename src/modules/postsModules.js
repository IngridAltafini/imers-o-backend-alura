import connectionMongo from '../config/dbConfig.js';
const connection = await connectionMongo(process.env.STRING_CONNECTION)
import { ObjectId } from 'mongodb';

export async function createPosts(description, imageUrl, alt) {
  const db = connection.db("imersao-backend-alura");
  const collection = db.collection("posts");

  const post = {
    description,
    imageUrl,
    alt,
  };

  const result = await collection.insertOne(post);

  if (!result.acknowledged) {
    throw new Error('Failed to insert post into the database');
  }

  return {
    _id: result.insertedId,
    description,
    imageUrl,
    alt,
  };
}


export async function listAllPosts() {
  const db = connection.db("imersao-backend-alura")
  const collection = db.collection("posts")

  return collection.find().toArray()
}

export async function findByIdPost(id) {
  const db = connection.db("imersao-backend-alura")
  const collection = db.collection("posts")

  return collection.findOne({ _id: new ObjectId(id) })
}