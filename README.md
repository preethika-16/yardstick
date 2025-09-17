📘 Multi-Tenant SaaS Notes Application

A multi-tenant SaaS Notes Application built with Node.js, Express, MongoDB, JWT Authentication, and React, deployed on Vercel.
The app supports multiple tenants (companies), strict data isolation, role-based access, and subscription feature-gating (Free vs Pro plan).

✨ Features

🔑 JWT Authentication with predefined accounts

🏢 Multi-Tenancy (Acme & Globex) with strict data isolation

👥 Role-based Access Control

Admin → Invite users & upgrade subscriptions

Member → CRUD operations on notes only

📑 Notes Management (CRUD) – Create, Read, Update, Delete notes per tenant

💳 Subscription Plans

Free Plan → Max 3 notes

Pro Plan → Unlimited notes

Upgrade API for Admins

🌐 Frontend UI (React) hosted on Vercel

⚡ Health Endpoint → /health returns { "status": "ok" }

🔒 Tenant Data Isolation → One company cannot see another’s data

🏗️ Tech Stack

Backend: Node.js, Express, MongoDB (Mongoose)

Frontend: React (Vite)

Authentication: JWT

Deployment: Vercel (Backend + Frontend)

Other: Helmet, CORS, Morgan, Bcrypt

🚀 Live Demo

Frontend: Deployed on Vercel["https://saas-notes-three.vercel.app/"]

Backend API: Deployed on Render 
https://saasnotes.onrender.com

(Replace # with your Vercel URLs)

🧪 Predefined Test Accounts

All accounts use the password: password

Email	Role	Tenant
admin@acme.test
	Admin	Acme
user@acme.test
	Member	Acme
admin@globex.test
	Admin	Globex
user@globex.test
	Member	Globex
🔗 API Endpoints
🔒 Authentication

POST /auth/login → Login with email + password

🏢 Tenants

POST /tenants/:slug/upgrade → Upgrade tenant (Admin only)

📑 Notes (Tenant Isolated)

POST /notes → Create note

GET /notes → List all notes for tenant

GET /notes/:id → Get specific note

PUT /notes/:id → Update note

DELETE /notes/:id → Delete note

❤️ Health

GET /health → { "status": "ok" }

📸 Screenshots
🔐 Login Page

📑 Notes Dashboard

⚠️ Upgrade Prompt (Free Limit Reached)

⚙️ Setup & Installation
🔧 Backend
git clone https://github.com/your-username/notes-saas.git
cd notes-saas
npm install
cp .env.example .env   # Fill MONGO_URI, JWT_SECRET, FRONTEND_URL
npm run seed           # Seed tenants & users
npm run dev            # Start backend server

💻 Frontend
cd frontend
npm install
npm run dev


Access app at: http://localhost:5173

🛠️ Deployment

Backend: Deployed on Vercel (serverless functions with Express & MongoDB Atlas)

Frontend: Deployed on Vercel (static React build)

Environment Variables
MONGO_URI=<your-mongodb-atlas-uri>
JWT_SECRET=<your-secret>
JWT_EXPIRES_IN=7d
FRONTEND_URL=https://your-frontend.vercel.app

✅ Evaluation Checklist

 Health endpoint returns OK

 All predefined accounts login successfully

 Tenant isolation enforced

 Role-based access restrictions

 Free plan → Max 3 notes

 Pro plan → Unlimited notes

 Upgrade endpoint works instantly

 CRUD operations functional

 Frontend deployed and accessible

📊 Multi-Tenant Approach

We used Shared Schema with tenantId column for multi-tenancy:

✅ Simple to implement

✅ Works well for small-scale SaaS

✅ Easy to enforce isolation with queries (tenantId filter)

❌ Less scalable compared to schema-per-tenant for very large tenants

(Explanation included in README as required)

🔒 Security & Performance

Passwords hashed with Bcrypt

JWT-based session management

Helmet & CORS for security headers & cross-origin safety

Indexes on tenantId for fast lookups

Future improvements:

Add pagination for notes

Use Redis cache for tenant plan lookups

Implement invite-user flow

👨‍💻 Author

Ritik Dethliya

💼 Full-Stack Developer (MERN)

🌱 Exploring SaaS & AI-based projects

🔗 LinkedIn
 | GitHub
