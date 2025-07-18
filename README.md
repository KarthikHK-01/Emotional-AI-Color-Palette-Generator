Welcome to Emotional AI Color Palette Generator.

Tech Stack used: React.js, Node.js, Express, Tailwind CSS, PostgreSQL

Steps to run the project
0. Install all the dependencies (in both frontend and backend).
1. Navigate to frontend directory.
2. Run npm run dev on console. This will run the frontend part of the project on port 5173.
3. In other terminal, navigate to backend directory.
4. Run nodemon server.js or node server.js.
5. This starts the backend of the project on the port 3000.


SQL - Creation of tables in postgreSQL
1. Creating users table
   CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,    // Note: The password is stored as a plaintext in the database.
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



3. Creating favorites table
   CREATE TABLE favourites (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    mood VARCHAR(100) NOT NULL,
    colors TEXT[] NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
