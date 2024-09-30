// 



const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files from the frontend folder
app.use(express.static(path.join(__dirname, '../frontend')));

// Disable caching for all routes to prevent users from accessing cached pages after logout
app.use((_req, res, next) => {
  res.setHeader('Cache-Control', 'no-store'); // Disables caching
  next();
});

// Set up session management with a 90-second expiration (you can adjust this as needed)
app.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 90000 } // Session expires after 90 seconds
}));

// Middleware to check if a session exists (i.e., if the user is logged in)
function checkSession(req, res, next) {
  if (!req.session.userId) {
    return res.redirect('/frontend/index.html'); // If no session, redirect to homepage
  }
  next(); // If session exists, proceed to the next middleware
}

// Example protected route for the logged-in page
app.get('/loggedin', checkSession, (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/loggedin.html')); // Serve the logged-in page if session is active
});

// Logout route: destroys the session and clears the cookie
app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.redirect('/frontend/index.html'); // If there's an error, redirect to homepage
    }
    res.clearCookie('connect.sid'); // Clear the session cookie (connect.sid is the default for express-session)
    res.redirect('/frontend/index.html'); // Redirect to homepage after logout
  });
});

// Start the server on port 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
