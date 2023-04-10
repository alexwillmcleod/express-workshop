# Express Workshop

Express API in Typescript with prisma for creating, reading, updating and deleting todos in a remote database.

### Routes

- GET /
  - Returns "Hello, World"
- GET /todos
  - Returns all todos in database
- POST /todos
  - Posts a todo to the database
  - Body fields `title` and `description` for the task
- DELETE /todos/:id
  - Deletes todo with `id`
- PATCH /todos/:id
  - Updates todo with `id` with body fields `title` and `description`

### Environment Variables

- DATABASE_URL
- PORT
