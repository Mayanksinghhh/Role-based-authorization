# Admin Role-Based Dashboard (Next.js + Express + MongoDB)

A minimal reference project demonstrating:
- JWT auth with roles (admin, editor, viewer)
- API authorization middleware in Express
- Next.js frontend with client-side guards and conditional UI
- MongoDB (Mongoose) models for Users, Posts, and Logs

## Quickstart

1) Prereqs: Node 18+, MongoDB running (local or Atlas).  
2) Copy env examples and fill values:

   ```bash
   cp api/.env.example api/.env
   cp web/.env.example web/.env
   ```

3) Install deps and run both apps:

   ```bash
   npm install --workspaces
   npm run dev
   ```

   - API runs on http://localhost:4000
   - Web runs on http://localhost:3000

4) Create some users (you can use the register route or the seed script):

   ```bash
   # Register an admin
   curl -X POST http://localhost:4000/auth/register -H "Content-Type: application/json"          -d '{"name":"Admin","email":"admin@example.com","password":"admin123","role":"admin"}'
   # Register an editor
   curl -X POST http://localhost:4000/auth/register -H "Content-Type: application/json"          -d '{"name":"Ed","email":"editor@example.com","password":"editor123","role":"editor"}'
   # Register a viewer
   curl -X POST http://localhost:4000/auth/register -H "Content-Type: application/json"          -d '{"name":"View","email":"viewer@example.com","password":"viewer123","role":"viewer"}'
   ```

5) Login from the web UI at `/login` with one of the accounts above.
   The API sets an HttpOnly cookie; the frontend calls authenticated endpoints with `credentials: 'include'`.

## Notes

- This is a teaching/demo scaffold. Harden, test, and extend before production.
- The Express server includes a simple activity logger that writes to the `logs` collection.
