# Blog Backend

A REST API backend for a personal blog, built to power the blog section of a personal portfolio site. The API serves posts over HTTP while keeping the MongoDB database private and server-side only.

## Tech Stack

| Layer        | Technology         | Purpose                                     |
| ------------ | ------------------ | ------------------------------------------- |
| Runtime      | Node.js            | JavaScript runtime for the server           |
| Framework    | Express 5          | HTTP routing and REST API                    |
| Database     | MongoDB Atlas      | Cloud-hosted document database              |
| ODM          | Mongoose 9         | Schema modeling and queries for MongoDB     |
| API docs     | Swagger UI + JSDoc | OpenAPI 3.0 docs served at `/api-docs`      |
| Dev tooling  | Nodemon            | Auto-restart the server during development  |
| Config       | dotenv             | Load secrets and settings from `.env`       |

All packages are CommonJS modules.

## Project Goals

- **Personal blog API** — serve blog posts to a portfolio frontend via a clean REST API.
- **Public-safe architecture** — visitors interact only with the Express API over HTTP; MongoDB credentials stay server-side in `.env`, never exposed to the browser or committed to git.
- **Simple and minimal** — a small, focused codebase that grows only as the blog features grow.
- **Easy local development** — `npm run dev` with Nodemon for auto-reload.
- **Production-ready wiring** — config, connection, and server startup split into clear files for easy deployment.

## Project Structure

```
blog-backend/
├── config.js        # Loads .env and connects to MongoDB via Mongoose
├── swagger.js       # OpenAPI config; serves Swagger UI at /api-docs
├── server.js        # Express app entry point; starts the HTTP server
├── .env             # Local secrets (gitignored) — MONGODB_URI, PORT
├── .env.example     # Template for copying to .env
├── .gitignore       # Excludes node_modules/ and .env
└── package.json     # Dependencies and npm scripts
```

## Getting Started

### Prerequisites

- Node.js installed
- A MongoDB Atlas cluster with a database user and network access configured

### Setup

1. Clone the repo and install dependencies:

   ```bash
   npm install
   ```

2. Create your `.env` file from the template:

   ```bash
   Copy-Item .env.example .env   # Windows
   # cp .env.example .env        # macOS/Linux
   ```

3. Edit `.env` and replace the placeholders with your Atlas connection string:

   ```
   MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/blog?retryWrites=true&w=majority
   PORT=5000
   ```

### Running

```bash
npm run dev    # development with Nodemon (auto-restart)
npm start      # production
```

Expected output:

```
MongoDB connected: <cluster host>
Server running on port 5000
```

Then visit `http://localhost:5000` — the root route returns `API is running`.

## API Documentation

Swagger UI is served at `http://localhost:5000/api-docs` and is generated from JSDoc `@swagger` annotations in the route files via `swagger-jsdoc`. As routes are added, annotate them so the docs stay in sync.

> Note: decide whether `/api-docs` should stay public in production or be gated to development only (`process.env.NODE_ENV`).

## Security Notes

- **`.env` is gitignored.** Never commit real MongoDB credentials.
- Use a dedicated Atlas DB user with the least privilege needed (e.g., `readWrite` on the blog database only).
- Restrict Atlas network access to your server's IP where possible.
- Credentials live only on the server — the frontend/visitors never receive them.

## Roadmap

- [x] Server startup, env config, and MongoDB connection
- [x] Swagger UI docs at `/api-docs`
- [ ] Blog post model and schema (title, content, tags, date, slug)
- [ ] CRUD routes for posts, annotated for Swagger
- [ ] Public read endpoints for the portfolio frontend
- [ ] Admin/write protection for creating and editing posts
- [ ] Automated tests (Jest + Supertest + mongodb-memory-server)
- [ ] Deployment to a hosting provider
