# AI-Based Smart Complaint Management System

A complete MERN stack complaint management system for registering, tracking, analyzing, and resolving civic complaints. The app uses Gemini AI to detect priority, recommend a department, summarize complaint text, and generate a user response.

## Features

- Secure signup, login, JWT authentication, and bcrypt password hashing
- Protected React routes and role-based admin access
- Complaint registration with name, email, title, description, category, location, and status
- Complaint list with search by location, category filter, status filter, details, update, and delete
- Dashboard statistics for total, pending, resolved, and high-priority complaints
- Gemini AI analysis with fallback rules when the API key is unavailable
- Responsive Tailwind CSS UI with cards, tables, forms, badges, spinners, and toast notifications
- MVC Express backend with validation, async error handling, and CORS
- Render-ready deployment configuration

## Tech Stack

- Frontend: React.js, React Router, Axios, Tailwind CSS, Vite
- Backend: Node.js, Express.js, MongoDB, Mongoose
- Authentication: JWT, bcryptjs
- AI: Gemini API via `@google/generative-ai`
- Deployment: Render
- Version Control: Git and GitHub

## Folder Structure

```text
root/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── validators/
│   ├── server.js
│   └── package.json
├── README.md
├── .gitignore
└── render.yaml
```

## Environment Variables

Create `server/.env`:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/smart_complaints
JWT_SECRET=replace_with_a_long_random_secret
GEMINI_API_KEY=replace_with_your_gemini_key
CLIENT_URL=http://localhost:5173
PORT=5000
NODE_ENV=development
```

Create `client/.env`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## Installation

```bash
cd server
npm install

cd ../client
npm install
```

## Run Locally

Start the backend:

```bash
cd server
npm run dev
```

Start the frontend:

```bash
cd client
npm run dev
```

Open `http://localhost:5173`.

## Seed Dummy Data

```bash
cd server
npm run seed
```

Seed credentials:

- Admin: `admin@example.com` / `Admin123`
- User: `user@example.com` / `User123`

## API Endpoints

### Auth

```http
POST /api/auth/signup
POST /api/auth/login
GET /api/auth/profile
```

### Complaints

```http
POST /api/complaints
GET /api/complaints
GET /api/complaints?category=Garbage&status=Pending
GET /api/complaints/search?location=Ghaziabad
GET /api/complaints/:id
PUT /api/complaints/:id
DELETE /api/complaints/:id
```

### AI

```http
POST /api/ai/analyze
```

## API Testing Examples

Login:

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"Admin123"}'
```

Create complaint:

```bash
curl -X POST http://localhost:5000/api/complaints \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "name": "Riya Sharma",
    "email": "riya@example.com",
    "title": "Water leakage in lane",
    "description": "A pipe is leaking continuously and water is collecting on the road.",
    "category": "Water Supply",
    "location": "Ghaziabad",
    "status": "Pending"
  }'
```

Update status:

```bash
curl -X PUT http://localhost:5000/api/complaints/COMPLAINT_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"status":"Resolved"}'
```

AI analysis:

```bash
curl -X POST http://localhost:5000/api/ai/analyze \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "Electric pole sparking",
    "description": "The pole is sparking and residents are worried about shock risk.",
    "category": "Electricity",
    "location": "Noida"
  }'
```

## Render Deployment

1. Push this repository to GitHub.
2. Create a MongoDB Atlas database and copy the connection string.
3. In Render, create services from `render.yaml`.
4. Set backend environment variables:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `GEMINI_API_KEY`
   - `CLIENT_URL` with the Render frontend URL
   - `NODE_ENV=production`
5. Set frontend environment variable:
   - `VITE_API_BASE_URL=https://your-backend-service.onrender.com/api`
6. Redeploy both services after setting environment variables.

## Screenshots

Add screenshots after deployment:

- Home page
- Login page
- Dashboard
- Complaint registration
- Complaint list
- AI analysis result
- Admin panel

## Test Scenarios

- Add a valid complaint and confirm AI analysis is displayed.
- Submit a complaint without a title and confirm validation error.
- Submit an invalid email and confirm validation error.
- Search complaints by location.
- Filter complaints by category and status.
- Update complaint status.
- Delete a complaint as admin.
- Confirm user cannot delete complaints.
- Login with valid credentials and verify JWT access.
- Login with invalid password and verify rejection.
- Confirm passwords are stored hashed in MongoDB.
- Confirm Gemini fallback still returns priority, department, summary, and response.

## GitHub Workflow

```bash
git init
git add .
git commit -m "Initial MERN smart complaint management system"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/smart-complaint-management.git
git push -u origin main
```

Sample commit messages:

- `Add Express auth and complaint APIs`
- `Add Gemini complaint analysis service`
- `Build React dashboard and complaint workflows`
- `Add Render deployment configuration`
- `Document setup and API usage`

## Future Improvements

- Email or SMS notifications for status changes
- Admin assignment workflow by department
- File uploads for complaint evidence
- Advanced analytics charts
- Automated test suite with Vitest, Supertest, and React Testing Library
- Pagination for large complaint datasets
