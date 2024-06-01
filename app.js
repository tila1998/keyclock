const express = require('express');
const session = require('express-session');
const Keycloak = require('keycloak-connect');

const app = express();

// Configure session
app.use(session({
  secret: 'some secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Note: Set secure to true if using HTTPS
}));

// Initialize Keycloak
const keycloak = new Keycloak({ store: session.MemoryStore() }, './keycloak.json');

// Apply Keycloak middleware
app.use(keycloak.middleware());

// Protect a route
app.get('/protected', keycloak.protect(), (req, res) => {
  res.send('This is a protected route');
});

// Open route
app.get('/', (req, res) => {
  res.send('This is an open route');
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
