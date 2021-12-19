const express = require('express');
const fs = require('fs');
const path = require('path');
const { notes } = require('./db/db.json');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// adds new notes to db.json
function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
    return note;
};

// posts new notes to site
app.post('/api/notes', (req, res) => {
    // sets id for each note
    req.body.id = Math.floor(Math.random() * 100000).toString();

    const note = createNewNote(req.body, notes);
    res.json(note);
});

// deletes notes by id
app.delete('/api/notes/:id', (req, res) => {
    var notesArray = notes.filter(({ id }) => id !== req.params.id);

    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
    res.json(notes);
});

app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});