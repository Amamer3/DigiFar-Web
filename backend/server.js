// server.js (Integrated)

import express from 'express'; // Import express
import session from 'express-session'; // Import express-session
import path from 'path'; // Import path
import { fileURLToPath } from 'url'; // Import utility for file URL
import pool from './db.js'; // Import the pool using the correct path and syntax
import cors from 'cors'; // Import CORS





// Set up __dirname using fileURLToPath
const __filename = fileURLToPath(import.meta.url); // Get the current file's path
const __dirname = path.dirname(__filename); // Get the directory name

const app = express();
const PORT = 3000;


// Enable CORS
app.use(cors({
  origin: 'http://127.0.0.1:5502', // Allow requests from this origin
  methods: 'GET,POST,PUT,DELETE', // Allowed HTTP methods
  credentials: true, // Allow credentials (e.g., cookies)
}));



// Serve static files from the frontend folder
app.use(express.static(path.join(__dirname, '../frontend')));

// Enable parsing of JSON and URL-encoded data (for POST requests)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Disable caching for all routes to prevent users from accessing cached pages after logout
app.use((_req, res, next) => {
  res.setHeader('Cache-Control', 'no-store'); // Disables caching
  next();
});

// Set up session management with a 10-minute expiration (600,000 milliseconds)
const sessionSecret = process.env.SESSION_SECRET || 'fallbackSecretForDevelopment'; // Fallback only for dev

app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 600000 } // 10 minutes
}));

// Middleware to check if a session exists (i.e., if the user is logged in)
function checkSession(req, res, next) {
  if (!req.session.userId) {
    return res.redirect('/index.html'); // If no session, redirect to login/home page
  }
  next(); // If session exists, proceed to the next middleware
}

// Example protected route for the logged-in page
app.get('/loggedin', checkSession, (_req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/loggedin.html')); // Serve the logged-in page if session is active
});

// Route to handle signup (example for creating a user)
app.post('/signup', async (req, res) => {
  const { email, firstName, lastName } = req.body;

  // Basic validation
  if (!email || !firstName || !lastName) {
    return res.status(400).send('All fields are required!');
  }

  try {
    // Save the user in PostgreSQL without a password
    const query = `
      INSERT INTO users (email, first_name, last_name)
      VALUES ($1, $2, $3) RETURNING id
    `;
    const result = await pool.query(query, [email, firstName, lastName]);
    const userId = result.rows[0].id;

    // Save the user ID in the session
    req.session.userId = userId;
    
    res.status(201).send('User created successfully!');
  } catch (error) {
    console.error('Error during signup: ', error);
    res.status(500).send('An error occurred during signup.');
  }
});


// Route to handle login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send('Email and password are required!');
  }

  try {
    const query = 'SELECT id FROM users WHERE email = $1 AND password = $2';
    const result = await pool.query(query, [email, password]);

    if (result.rows.length > 0) {
      const userId = result.rows[0].id;
      req.session.userId = userId; // Set the session userId
      res.status(200).send('Login successful');
    } else {
      res.status(401).send('Invalid credentials');
    }
  } catch (error) {
    console.error('Error during login: ', error);
    res.status(500).send('An error occurred during login.');
  }
});

// Logout route: destroys the session and clears the cookie
app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.redirect('/index.html'); // If there's an error, redirect to homepage
    }
    res.clearCookie('connect.sid'); // Clear the session cookie (connect.sid is the default for express-session)
    res.redirect('/index.html'); // Redirect to homepage after logout
  });
});

// Start the server on port 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
