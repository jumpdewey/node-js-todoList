const fs = require('fs');


var fetchNotes = () => {
  try {
    var notesString = fs.readFileSync('notes-data.json');
    return JSON.parse(notesString);
  } catch(e) {
    return [];
  }
};

var saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json',JSON.stringify(notes));
};

var addNote = (title, body) => {
  var note = {
    title,
    body
  };
  var notes = fetchNotes();
  var duplicateNotes =  notes.find((note) => note.title === title);
  if (duplicateNotes === undefined) {
    notes.push(note);
    saveNotes(notes);
    return note;
  };
};

var removeNote = (title) => {
  // fetch notes
  // filter notes, removing the one with title of argument
  // save new notes array
  var notes = fetchNotes();
  var filteredNotes = notes.filter((note) => note.title !== title);
  saveNotes(filteredNotes);
  return filteredNotes.length !== notes.length;
};

var getNote = (title) => {
  // fetch notes
  // filter notes with given title
  // check has found or not
  var notes = fetchNotes();
  var filteredNotes = notes.filter((note) => note.title === title);
  return filteredNotes[0];
};

var logNote = (note) => {
  console.log('--');
  console.log(`Title: ${note.title}`);
  console.log(`Body: ${note.body}`);
}



module.exports = {
  fetchNotes,
  addNote,
  removeNote,
  getNote,
  logNote
};
