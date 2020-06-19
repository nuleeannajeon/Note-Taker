const express = require("express");
const fs = require( "fs" )

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// GET /api/notes - Should read the db.json file and return all saved notes as JSON.
var notesList = readNotes();

function readNotes(){
    const notes = JSON.parse( fs.readFileSync( './db/db.json', 'utf8' ) )
    return notes
}

function saveNotes(){
    fs.writeFileSync( './db/db.json', JSON.stringify( notesList ))
}

app.get('/api/notes', function (req, res){
    console.log( `[GET]----> /api/notes` );
    res.send( notesList );
});

// POST /api/notes - Should receive a new note to save on the request body, 
// add it to the db.json file, and then return the new note to the client.
app.post('/api/notes', function (req, res){
    let newNote = req.body;
    newNote.id = Date.now();

    notesList.push( newNote );
    console.log( notesList );

    saveNotes();
    console.log( `[POST /api/notes]----> ${newNote}` );
    res.send( { status: true, message: `${newNote} is SAVED to [notesList]` } )
})

// DELETE /api/notes/:id - Should receive a query parameter containing the id of a note to delete. 
// This means you'll need to find a way to give each note a unique id when it's saved. 
// In order to delete a note, you'll need to read all notes from the db.json file, 
// remove the note with the given id property, and then rewrite the notes to the db.json file.
app.delete('/api/notes/:id', function (req, res){
    const noteId = req.params.id;

    notesList = notesList.filter( note=>note.id != noteId)
    //filter = functional programming...
    //input array ---> do somthing with it ----> output array....
    //ex. notesList = notesList.filter( function( note ){ return note.id !== "noteId" ? true : false }) ====> same thing

    saveNotes();
    console.log('[DELETE] ')
    res.send( { id: noteId, message: "Delete successfully", status: true })
})

//LISTENER-------------------------------------
app.listen(PORT, function(){
    console.log(`App listening on PORT`+ PORT);
});