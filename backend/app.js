const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to serve static frontend files
app.use(express.static(path.join(__dirname, '../frontend')));

// Set up session management
app.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge:  60000} // 1-minute session expiration
}));

// Middleware to check if user is logged in
function checkSession(req, res, next) {
  if (!req.session.userId) {
    return res.redirect('/'); // Redirect to homepage if session has expired
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
      return res.redirect('/loggedin');
    }
    res.clearCookie('connect.sid');
    res.redirect('/'); // Redirect to homepage after logout
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
