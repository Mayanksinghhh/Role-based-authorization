# Admin Role-Based Dashboard (Next.js + Express + MongoDB)

A minimal reference project demonstrating:
- JWT auth with roles (admin, editor, viewer)
- API authorization middleware in Express
- Next.js frontend with client-side guards and conditional UI and little bit of UI decoration
- MongoDB (Mongoose) models for Users, Posts, and Logs

## Quickstart

1) Prereqs: Node 18+, MongoDB running (local or Atlas).  
2) Copy env examples and fill values:

     api/.env--
    MONGODB_URI=mongodb+srv://dummyUser:DummyPassword@cluster0.ukqx0fm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
    JWT_SECRET=dummy-SecretJWT
    CLIENT_ORIGIN=http://localhost:3000
    PORT=4000

     web/.env
    NEXT_PUBLIC_API_BASE=http://localhost:4000



4) Install deps and run both apps:

   npm install --workspaces 
   npm run dev

   - API runs on http://localhost:4000
   - Web runs on http://localhost:3000

5) Create some users (you can use the register route or the seed script):
   --Using register route--
   Use any client like hopscotch or postman and enter URL - http://localhost:4000/auth/register
   Body for user 
   {"name":"Mayank singh","email":"mayankkr0077@gmail.com","password":"mayank123","role":"viewer"}
   Body for admin 
   {"name":"Mayank singh","email":"mayankkr0077@gmail.com","password":"mayank123","role":"admin"}
   Body for editor 
   {"name":"Mayank singh","email":"mayankkr0077@gmail.com","password":"mayank123","role":"editor"}

6) Login from the web UI at `/login` with one of the accounts above.
   The API sets an HttpOnly cookie; the frontend calls authenticated endpoints with `credentials: 'include'`.

## Notes

- This is a teaching/demo scaffold. Harden, test, and extend before production.
- The Express server includes a simple activity logger that writes to the `logs` collection.
