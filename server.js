const express = require('express');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();
const { uuid } = require('uuidv4');
const { notes } = require('./db/db.json');

//parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
//parse incoming JSON data
app.use(express.json());

//import asset files for html
app.use(express.static('public'));


//route to index.html and notes.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

//route to notes.html page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});


//api routes
app.get('/api/notes', (req, res) => {
    res.json(notes);
})

//create new note route
app.post('/api/notes', (req, res) => {
    req.body.id = uuid();
    console.log('id', req.body.id);
    const newNote = createNewNote(req.body, notes);
    res.json(newNote);
})

//create new note function
function createNewNote(body, noteArr) {
    const newNote = body;
    noteArr.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({ notes: noteArr }, null, 2)
    );
    return newNote;
}


//delete note api route
app.delete('/api/notes/:id', (req, res) => {
    const note = findById(req.params.id, notes);

    deleteNote(note, notes);
    res.json();
})

//create find id function
function findById(id, noteArr) {
    const result = noteArr.filter(note => note.id === id)[0];
    return result;
}

//delete note function
function deleteNote(note, noteArr) {
    const index = noteArr.indexOf(note);
    noteArr.splice(index, 1);

    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({ notes: noteArr }, null, 2)
    );
}


//return homepage route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

//listener
app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
});