import { MongoClient, Collection, Db } from 'mongodb';
import { User, Post, Comment } from '../types';
import dotenv from 'dotenv';

dotenv.config();

const URL = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017';
const dbName = 'node_assignment';

let client: MongoClient;
let db: Db;

export async function connectToDatabase() {
  try {
    if (!client) {
      client = new MongoClient(URL, {
        connectTimeoutMS: 5000,
        serverSelectionTimeoutMS: 5000,
      });

      await client.connect();
      db = client.db(dbName);

      await Promise.all([
        db.collection<User>('users').createIndex({ id: 1 }, { unique: true }),
        db.collection<Post>('posts').createIndex({ id: 1 }, { unique: true }),
        db.collection<Comment>('comments').createIndex({ id: 1 }, { unique: true }),
      ]);

      console.log('Successfully connected to MongoDB');
    }
    return db;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new Error('Could not connect to MongoDB');
  }
}

export function getCollections() {
  if (!db) {
    throw new Error('Database not initialized. Call connectToDatabase first.');
  }

  return {
    users: db.collection<User>('users'),
    posts: db.collection<Post>('posts'),
    comments: db.collection<Comment>('comments'),
  };
}

export async function closeConnection() {
  if (client) {
    await client.close();
    console.log('MongoDB connection closed');
  }
}