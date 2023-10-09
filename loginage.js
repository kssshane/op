// Import the necessary modules
const express = require('express');
const { Pool } = require('pg');

// Create a new instance of Express
const app = express();

// Create a new instance of the PostgreSQL Pool
const pool = new Pool({
  user: 'root',
  host: 'local',
  database: 'postgres',
  password: '1234',
  port: 5432, // Default PostgreSQL port
});

// Get the input fields
var usernameField = document.getElementById('username');
var passwordField = document.getElementById('password');

// Get the form element
var loginForm = document.getElementById('login-wrap active');

// Add event listener to the form submit event
loginForm.addEventListener('submit', function(event) {
  // Prevent form submission
  event.preventDefault();

  // Get the values from the input fields
  var username = usernameField.value;
  var password = passwordField.value;

  // Perform your login logic here
  // You can send an SQL query to insert the data into the database
  const query = 'INSERT INTO users (id, username, password) VALUES ($1, $2)';
  const values = [1, username, password];

  pool.query(query, values, (error, result) => {
    if (error) {
      console.error('Error executing query', error);
      return;
    }

    // Redirect the user to the dashboard or home page
    window.location.href = 'melo.html';
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});