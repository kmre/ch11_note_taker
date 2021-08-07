//Code colaborators Ben Gallagher, Emily Necciai Mayeski, Ani C, Dana Bottoni, Daniel Carazo, Shane Crisostomo
//Code sections also taken from https://www.tabnine.com/code/javascript/functions/express/Express/delete
//Code from Module 11 also referenced

const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const path = require("path");
const fs = require("fs");

var arrayNotes = [];
var indexPath = path.join(__dirname, "./public/index.html");
var notePath = path.join(__dirname, "./public/notes.html");


//const {notes} = require("./miniature-eureka/Develop/db/db");

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));


//Generate Unique ID
const generateUniqueId = require("generate-unique-id");

//Create New Note
function createNewNote(body, arrayNotes) {
    const note = body;
    arrayNotes.push(note);
    fs.writeFileSync(
      path.join(__dirname, './miniature-eureka/Develop/db/db.json'),
      JSON.stringify({ notes: arrayNotes}, null, 2)
    );
    return note;
  };  

//Routes
app.get('/', (req, res) => {
  res.sendFile(indexPath);
});

app.get('/notes', (req, res) => {
  res.sendFile(notePath);
});

// app.get('/api/notes', (req, res) => {
//   res.json(notes);
// });

// app.post('/api/notes', (req, res) => {
//   req.body.id = generateUniqueId();
//   const note = createNewNote(req.body, notes);
//   res.json(note);
// });
    
//Bonus - DELETE 
//As noted above this code reference was found here: https://www.tabnine.com/code/javascript/functions/express/Express/delete
//Source originally found by Emily
// app.delete('/api/notes/:id', (req, res) => {
//   const { id } = req.params;

//   const delNote = notes.findIndex(note => note.id ==id);

//   notes.splice(delNote, 1);
//   return res.send();
// });

//listen for port
app.listen(PORT, () => {
  console.log(`API server port: ${PORT}`);
});