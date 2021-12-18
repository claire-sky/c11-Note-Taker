const express = require('express');
const fs = require('fs');
const path = require('path');
const { notes } = require('./db/db');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

const getNotes = (formData = {}) => {
    let queryUrl = '/api/notes';
  
    Object.entries(formData).forEach(([key, value]) => {
      queryUrl += `${key}=${value}&`;
    });
  
    fetch(queryUrl)
      .then(response => {
        if (!response.ok) {
          return alert('Error: ' + response.statusText);
        }
        return response.json();
      })
      .then(noteData => {
        console.log(noteData);
        printResults(noteData);
      });
  };

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});