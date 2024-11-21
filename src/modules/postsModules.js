import connectionMongo from '../config/dbConfig.js';
const connection = await connectionMongo(process.env.STRING_CONNECTION)
import { ObjectId } from 'mongodb';

export async function createPosts(newPosts) {
  const db = connection.db("imersao-backend-alura");
  const collection = db.collection("posts");

  const result = await collection.insertOne(newPosts);

  if (!result.acknowledged) {
    throw new Error('Failed to insert post into the database');
  }

  return {
    data: {
      _id: result.insertedId,
      ...newPosts,
    },
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

export async function deleteByIdPost(id) {
  const db = connection.db("imersao-backend-alura")
  const collection = db.collection("posts")

  return collection.deleteOne({ _id: new ObjectId(id) })
}

export async function updatePostInDb(id, updateData) {
  const db = connection.db("imersao-backend-alura");
  const collection = db.collection("posts");

  if (!ObjectId.isValid(id)) {
    throw new Error('Invalid ID format');
  }

  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: updateData }
  );

  if (result.matchedCount === 0) {
    throw new Error('Post not found');
  }

  return {
    data: {
      _id: id,
      ...updateData,
    },
  };
}