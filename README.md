# JWT Auth — Movie API

A small TypeScript Express backend that provides JWT-based authentication and protected CRUD endpoints for managing movies.

---

## ✅ Features

- User signup and login with JWT authentication
- Protected movie CRUD endpoints (per-user)
- Input validation using **zod**
- Passwords hashed using **bcryptjs**

---

## 🧰 Requirements

- Node.js (recommended v16+)
- npm
- A running MongoDB instance

---

## 🚀 Quick Start

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file with the following variables:

   ```env
   DATABASE_URI=mongodb://localhost:27017/yourdb
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRES_IN=4h # optional
   PORT=5000 # optional
   ```

3. Start in development:

   ```bash
   npm run dev
   ```

4. Or build and run:

   ```bash
   npm run build
   npm start
   ```

---

## 📁 Project Structure (top-level)

- `src/app.ts` - Express app and route mounting
- `src/index.ts` - Server start and DB connection
- `src/config/db.ts` - MongoDB connection
- `src/routes/` - Route definitions (`authRouter`, `movieRouter`)
- `src/controllers/` - Request handlers
- `src/models/` - Mongoose models (`User`, `Movie`)
- `src/middlewares/auth.ts` - JWT auth middleware
- `src/utils/jwt.ts` - Sign/verify helpers
- `src/validators/` - Zod validation schemas

---

## 🔌 API Endpoints

Base URL: `http://localhost:5000`

Health check

- GET `/` — returns `API is running...!`

Auth

- POST `/api/v1/auth/signup` — body: `{ username, email, password }` → returns token
- POST `/api/v1/auth/login` — body: `{ email, password }` → returns token

Movies (PROTECTED — requires `Authorization: Bearer <token>`)

- GET `/api/v1/movies` — list user's movies
- POST `/api/v1/movies` — body: `{ title, description, director, releaseYear, rating, genre? }` — create
- PUT `/api/v1/movies/:id` — update movie
- DELETE `/api/v1/movies/:id` — delete movie

---

## 🔐 Notes

- Tokens are signed with `JWT_SECRET` and use `JWT_EXPIRES_IN` (default `4h`).
- Passwords are hashed using bcrypt before storing in DB.
- Request payloads are validated with `zod`; invalid input yields `400` responses with a message.

---

## 💡 Example Requests

Signup:

```bash
curl -X POST http://localhost:5000/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"username":"alice","email":"alice@example.com","password":"secret123"}'
```

Fetch movies (replace `<token>`):

```bash
curl http://localhost:5000/api/v1/movies \
  -H "Authorization: Bearer <token>"
```

---

## 📄 License

ISC
