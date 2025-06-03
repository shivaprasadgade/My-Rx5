# Node.js REST API with MongoDB

This is a simple Node.js REST API server that uses MongoDB to store user data, posts, and comments. The data is fetched from JSONPlaceholder API.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally on port 27017)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Make sure MongoDB is running on your local machine

3. Start the server:
```bash
npm start
```

The server will start on port 3000.

## API Endpoints

### GET /load
Loads 10 users into the database along with their posts and comments from JSONPlaceholder.

### DELETE /users
Deletes all users from the database.

### DELETE /users/:userId
Deletes a specific user by ID.

### GET /users/:userId
Gets a specific user by ID, including their posts and comments.

### PUT /users
Adds a new user to the database. The user data should be sent in the request body.

## Error Handling

The API returns appropriate HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 404: Not Found
- 409: Conflict
- 500: Internal Server Error

## Data Format

The API uses the following data structure for users:

```typescript
interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    }
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
  posts?: Post[];
}
``` 