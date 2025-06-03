import http from 'http';
import { URL } from 'url';
import { connectToDatabase, getCollections, closeConnection } from './db/connection';
import { User, Post, Comment } from './types';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3001;
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017';

async function handleRequest(req: http.IncomingMessage, res: http.ServerResponse) {
  const { pathname, searchParams } = new URL(req.url || '', `http://${req.headers.host}`);
  const userId = searchParams.get('userId') || pathname.split('/')[2];

  // Enhanced CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const collections = getCollections();

  try {
    switch (req.method) {
      case 'GET':
        if (pathname === '/load') {
          const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users?_limit=10');
          const users: User[] = await usersResponse.json();

          // Fetch posts for all users in parallel
          const postsPromises = users.map(user =>
            fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`).then(res => res.json())
          );
          const postsArrays: Post[][] = await Promise.all(postsPromises);
          const posts = postsArrays.flat();

          // Fetch comments for all posts in parallel
          const commentsPromises = posts.map(post =>
            fetch(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`)
              .then(res => res.json())
              .then(comments => ({ post, comments }))
          );
          const commentsData = await Promise.all(commentsPromises);

          // Prepare data for insertion
          const comments = commentsData.flatMap(data => data.comments);
          for (const { post, comments } of commentsData) {
            post.comments = comments;
          }

          // Insert data into MongoDB
          await Promise.all([
            collections.users.insertMany(
              users.map(user => ({
                ...user,
                postIds: posts.filter(post => post.userId === user.id).map(post => post.id),
              }))
            ),
            collections.posts.insertMany(posts),
            collections.comments.insertMany(comments),
          ]);

          res.writeHead(200);
          res.end(JSON.stringify({ success: true, message: 'Data loaded successfully' }));
        } else if (pathname === '/users') {
          // Get all users
          const users = await collections.users.find().toArray();
          res.writeHead(200);
          res.end(JSON.stringify(users));
        } else if (pathname.startsWith('/users/')) {
          // Get single user with posts and comments
          const user = await collections.users.findOne({ id: parseInt(userId) });
          if (!user) {
            res.writeHead(404);
            res.end(JSON.stringify({ error: 'User not found' }));
            return;
          }

          const posts = await collections.posts.find({ userId: parseInt(userId) }).toArray();
          for (const post of posts) {
            post.comments = await collections.comments.find({ postId: post.id }).toArray();
          }

          res.writeHead(200);
          res.end(JSON.stringify({ ...user, posts }));
        }
        break;

      case 'DELETE':
        if (pathname === '/users') {
          await collections.users.deleteMany({});
          await collections.posts.deleteMany({});
          await collections.comments.deleteMany({});
          res.writeHead(200);
          res.end();
        } else if (pathname.startsWith('/users/')) {
          const userIdNum = parseInt(userId);
          const result = await collections.users.deleteOne({ id: userIdNum });
          if (result.deletedCount === 0) {
            res.writeHead(404);
            res.end(JSON.stringify({ error: 'User not found' }));
            return;
          }
          // Cascading delete for posts and comments
          const posts = await collections.posts.find({ userId: userIdNum }).toArray();
          const postIds = posts.map(post => post.id);
          await collections.posts.deleteMany({ userId: userIdNum });
          await collections.comments.deleteMany({ postId: { $in: postIds } });
          res.writeHead(200);
          res.end();
        }
        break;

      case 'PUT':
        if (pathname === '/users') {
          let body = '';
          req.on('data', (chunk: Buffer) => {
            body += chunk.toString();
          });

          req.on('end', async () => {
            try {
              const user: User = JSON.parse(body);
              // Basic input validation
              const requiredFields = ['id', 'name', 'username', 'email'];
              if (!requiredFields.every(field => field in user)) {
                res.writeHead(400);
                res.end(JSON.stringify({ error: 'Missing required fields' }));
                return;
              }

              const existingUser = await collections.users.findOne({ id: user.id });
              if (existingUser) {
                res.writeHead(409);
                res.end(JSON.stringify({ error: 'User already exists' }));
                return;
              }

              await collections.users.insertOne(user);
              res.writeHead(201, {
                'Content-Type': 'application/json',
                'Location': `/users/${user.id}`,
              });
              res.end(JSON.stringify(user));
            } catch (error) {
              res.writeHead(400);
              res.end(JSON.stringify({ error: 'Invalid request body' }));
            }
          });
        }
        break;

      default:
        res.writeHead(405);
        res.end(JSON.stringify({ error: 'Method not allowed' }));
    }
  } catch (error) {
    console.error('Request handling error:', error);
    res.writeHead(500);
    res.end(
      JSON.stringify({
        error: 'Internal server error',
        details: error instanceof Error ? error.message : String(error),
      })
    );
  }
}

async function startServer() {
  try {
    await connectToDatabase();
    console.log('Database collections ready:', Object.keys(getCollections()));

    const server = http.createServer(handleRequest);

    server.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log('Available endpoints:');
      console.log(`  GET /load - Load sample data`);
      console.log(`  GET /users - List all users`);
      console.log(`  GET /users/:id - Get user with posts/comments`);
      console.log(`  PUT /users - Create a new user`);
      console.log(`  DELETE /users - Delete all users`);
      console.log(`  DELETE /users/:id - Delete a specific user`);
    });

    process.on('SIGINT', async () => {
      console.log('\nShutting down gracefully...');
      server.close();
      await closeConnection();
      process.exit(0);
    });
  } catch (error) {
    console.error('Server startup failed:', error);
    process.exit(1);
  }
}

startServer();