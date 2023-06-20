# Green Lake Pickleball Server API

## Routes

- Login
  - Signup: `POST /api/login/signup`
  - Login: `POST /api/login`
  - Change Password `POST /api/login/password`
- News
  - Create: `POST /api/posts` - restricted to users with the "admin" role
  - Update a post: `PUT /api/posts/:id` - restricted to users with the "admin" role
  - Get all posts: `GET /api/posts` - open to all users
  - Get specific post: `GET /api/posts/:id` - open to all users
- Schedule
  - Create: `POST /api/schedule` - restricted to users with the "admin" role
  - Update an event: `PUT /api/schedule/:id` - restricted to users with the "admin" role
  - Get all events: `GET /api/schedule?page=&perPage=` - open to all users (`page` and `perPage` are optional query parameters)
  - Get events in a date range: `GET /api/schedule?start==ISODate&end==ISODate` - open to all users
  - Get specific event: `GET /api/schedule/:id` - open to all users

## What I learned

- Postman environments and pre-scripts (for auth and authz)
- Spent a lot of time figuring out how to get server routes working with react router. Ended up adding `/api` prefix to API routes.
- Webpack and building static files
- How to connect react frontend to express backend

## Future work

- Versioning posts for easy revert
- Add email validation to user schema
- Add signup email verification via magic link (sent from frontend)
- Build frontend for creating news posts
