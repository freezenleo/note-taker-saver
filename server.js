const express = require('express');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const { notes } = require('./db/db.json');

app.use(express.static('public'));

//routes to index.html and notes.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

//api routes
app.get('/api/notes', (req, res) => {
    // let saver = notes;
    res.json(notes);
})

// app.post('/api/notes', (req, res) => {
//     req.body.id = animals.length.toString();

//     const newNote = createNewNote(req.body, notes);
//     res.json(newNote);
// })

// function createNewNote(body, noteArr) {
//     const newNote = body;
//     noteArr.push(newNote);
//     fs.writeFileSync(
//         path.join(__dirname, './db/db.json'),
//         JSON.stringify({ notes: noteArr }, null, 2)
//     );
//     return newNote;
// }

//listener
app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
});