// 



const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to serve static frontend files
app.use(express.static(path.join(__dirname, '../frontend')));

// Disable caching to prevent accessing logged-in pages after logout
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store');
  next();
});

// Set up session management
app.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 90000 } // session expiration (90 seconds)
}));

// Middleware to check if user session is active
function checkSession(req, res, next) {
  if (!req.session.userId) {
    return res.redirect('/frontend/index.html'); // Redirect to homepage if session has expired
  }
  next(); // Continue to the next middleware/route handler if session is valid
}

// Example route to serve the logged-in page
app.get('/loggedin', checkSession, (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/loggedin.html'));
});

// Logout route
app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.redirect('/frontend/index.html'); // Redirect to loggedin page if there's an error during logout
    }
    res.clearCookie('connect.sid'); // Clear session cookie
    res.redirect('/frontend/index.html'); // Redirect to homepage after logout
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
