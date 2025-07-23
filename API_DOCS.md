# Twitter API Documentation

## Base URL
`http://localhost:8080`

## Authentication
Include JWT token in request headers:
```
token: your-jwt-token-here
```
or
```
Authorization: Bearer your-jwt-token-here
```

## API Endpoints

### Authentication

#### Login
```
POST /auth/login
Content-Type: application/json

{
  "id": "john_doe",
  "password": "password123"
}

Response:
{
  "success": true,
  "message": "Login successful",
  "token": "jwt-token-here",
  "user": {
    "id": "john_doe",
    "email": "john@example.com"
  }
}
```

### User Management

#### Register
```
POST /user/register
Content-Type: application/json

{
  "id": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "id": "john_doe",
  "email": "john@example.com",
  "_id": "user-id"
}
```

#### Follow User
```
POST /user/follow/:userId
Authorization: token jwt-token-here

Response:
{
  "success": true,
  "message": "Successfully followed user",
  "following": 5,
  "followers": 10
}
```

#### Get Followers
```
GET /user/followers
Authorization: token jwt-token-here

Response:
{
  "success": true,
  "followers": [array of follower users],
  "count": 10
}
```

#### Get User Stats
```
GET /user/stats
Authorization: token jwt-token-here

Response:
{
  "success": true,
  "stats": {
    "user": { user object },
    "followersCount": 10,
    "followingCount": 5,
    "tweetsCount": 25,
    "followers": [array],
    "following": [array],
    "tweets": [array]
  }
}
```

### Tweets

#### Get All Tweets
```
GET /twitter

Response:
{
  "success": true,
  "tweets": [array of recent tweets]
}
```

#### Create Tweet
```
POST /twitter
Authorization: token jwt-token-here
Content-Type: application/json

{
  "Tweet": "This is my tweet content"
}

Response:
{
  "success": true,
  "message": "Tweet posted successfully",
  "tweet": { tweet object }
}
```

#### Like Tweet
```
PUT /twitter/like/:tweetId

Response:
{
  "success": true,
  "message": "Tweet liked successfully",
  "tweet": { updated tweet with like count }
}
```

#### Delete Tweet
```
DELETE /twitter/:tweetId
Authorization: token jwt-token-here

Response:
{
  "success": true,
  "message": "Tweet deleted successfully"
}
```

#### Get User Tweets
```
GET /user/tweets/:userId

Response:
{
  "success": true,
  "tweets": [array of user tweets]
}
```

## Error Responses

All error responses follow this format:
```json
{
  "success": false,
  "message": "Error description"
}
```

Common HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Internal Server Error
