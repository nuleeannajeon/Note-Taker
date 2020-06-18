const express = require("express");
const fs = require( "fs" )

const app = express();
const PORT = 3000;

app.use(express.static('public'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// GET /api/notes - Should read the db.json file and return all saved notes as JSON.
function readNotes(){
    const notes = JSON.parse( fs.readFileSync( 'db.json', 'utf8' ) )
    return notes
}
const notesList = readNotes();

app.get('/api/notes', function (req, res){
    console.log( `[GET]----> /api/notes` );
    res.send(notesList);
});

// POST /api/notes - Should receive a new note to save on the request body, 
// add it to the db.json file, and then return the new note to the client.


// DELETE /api/notes/:id - Should receive a query parameter containing the id of a note to delete. 
// This means you'll need to find a way to give each note a unique id when it's saved. 
// In order to delete a note, you'll need to read all notes from the db.json file, 
// remove the note with the given id property, and then rewrite the notes to the db.json file.
