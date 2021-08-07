//Code colaborators Ben Gallagher, Emily Necciai Mayeski, Ani C, Dana Bottoni, Daniel Carazo, Shane Crisostomo
//Code sections also taken from https://www.tabnine.com/code/javascript/functions/express/Express/delete
//Code from Module 11 also referenced

const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const path = require("path");
const fs = require("fs");
//Generate Unique ID
const generateUniqueId = require('generate-unique-id');

var arrayNotes = [];
var indexPath = path.join(__dirname, "./public/index.html");
var notesPath = path.join(__dirname, "./public/notes.html");

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));

//Routes
app.get('/', (req, res) => {
  res.sendFile(indexPath);
});

app.get('/notes', (req, res) => {
  res.sendFile(notesPath);
});

app.get('/api/notes', (req, res) => {
res.json(arrayNotes);
});

app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  //newNote.id = arrayNotes.length.toString();
  newNote.id = generateUniqueId();
  arrayNotes.push(newNote);
  console.log(arrayNotes)
  fs.writeFile('./db/db.json', JSON.stringify(arrayNotes),(err) => {
    if (err) {
        console.log("Error occurred: " + err)
    }
  })
  res.json(arrayNotes);
});
    
//Bonus - DELETE 
//As noted above this code reference was found here: https://www.tabnine.com/code/javascript/functions/express/Express/delete
//Source originally found by Emily
app.delete('/api/notes/:id', (req, res) => {
  const {id} = req.params;
  console.log("ID: " + id)
  const deleteNote = arrayNotes.findIndex(body => body.id == id)
  console.log("Delete Note: " + deleteNote)
  arrayNotes.splice(deleteNote, 1);
  console.log(arrayNotes);
  return res.send();
});

//listen for port
app.listen(PORT, () => {
  console.log(`API server port: ${PORT}`);
});