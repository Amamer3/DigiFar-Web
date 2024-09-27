const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware  frontend files
app.use(express.static(path.join(__dirname, '../frontend')));

// Set up session management
app.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 } // 00-minute session expiration
}));

// Example route to serve the logged-in page
app.get('./frontend/index.html', (req, res) => {
  if (!req.session.userId) {
    return res.redirect('./frontend/index.html');
  }
  res.sendFile(path.join(__dirname, '../frontend/loggedin.html'));
});

// Logout route
app.get('/frontend/index.html', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.redirect('/loggedin');
    }
    res.clearCookie('connect.sid');
    res.redirect('/frontend/index.html');
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
