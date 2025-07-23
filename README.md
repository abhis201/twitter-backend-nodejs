# Twitter Backend Clone

A Node.js backend application that replicates core features of Twitter, built with Express.js, MongoDB, and Mongoose.

## Features

- **User Management**: Registration, login, and user profiles
- **Tweets**: Create, delete, and like tweets
- **Social Features**: Follow/unfollow users, view followers
- **Timeline**: View user tweets and statistics

## API Endpoints

### Authentication
- `POST /auth/login` - User login

### Users
- `POST /user/register` - User registration
- `POST /user/follow/:id` - Follow a user
- `GET /user/followers` - Get user's followers
- `GET /user/stats` - Get user statistics (followers, following, tweets)
- `GET /user/search/:id` - Search for users
- `GET /user/tweets/:id` - Get tweets for a specific user

### Tweets
- `GET /twitter` - Get all tweets (recent first)
- `POST /twitter` - Create a new tweet
- `DELETE /twitter/:id` - Delete a tweet
- `PUT /twitter/like/:id` - Like a tweet

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example`:
   ```
   NODE_ENV=development
   PORT=8080
   DB_CONN=mongodb://localhost:27017
   SECRET_KEY=your-secret-key-here
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

## Database Models

### User
- id (String, unique)
- email (String, unique, validated)
- password (String, hashed)

### Follow
- User (User reference)
- Followers (Array of User references)
- Following (Array of User references)
- Tweets (Array of Tweet references)

### Tweet
- Tweet (String, unique)
- Likes (Number, default: 0)

## Authentication

The application uses a simple session-based authentication where the user ID is stored in `process.env.USER` or passed via the `user` header.

## Usage Example

1. Register a new user:
   ```bash
   POST /user/register
   {
     "id": "john_doe",
     "email": "john@example.com",
     "password": "password123"
   }
   ```

2. Login:
   ```bash
   POST /auth/login
   {
     "id": "john_doe",
     "password": "password123"
   }
   ```

3. Create a tweet:
   ```bash
   POST /twitter
   {
     "Tweet": "Hello, Twitter clone!"
   }
   ```

4. Follow a user:
   ```bash
   POST /user/follow/USER_ID
   ```