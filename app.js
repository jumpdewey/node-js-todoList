
const fs = require('fs');
const notes = require('./notes.js');
const _ = require('lodash');
var title = {
  alias:'t',
  demand:true,
  describe:'The title of this note'
}
var body = {
  alias: 'b',
  demand:true,
  describe:'The body of this note'
}
const yargs = require('yargs')
            .command('add', 'Adding a note to list', {
              title,
              body
            })
            .help('h')
            .command('list', 'List all notes from list')
            .command('read', 'Read a note', {
              title
            })
            .command('remove','Remove a note', {
              title
            })
// console.log(yargs);
const argv = yargs.argv;
// console.log(argv);
var command = process.argv[2];
// console.log('Command: ', command);
// console.log(process.argv);



if(command === 'add') {
  var note = notes.addNote(argv.title,argv.body);
  if (note) {
    console.log('Adding note successfully.');
    notes.logNote(note);
  } else {
    console.log('Have found the same title.');
  }
} else if(command === 'list') {
  var allNotes = notes.fetchNotes();
  console.log(`Printing ${allNotes.length} note(s).`);
  allNotes.forEach((note) => notes.logNote(note));

} else if(command === 'read') {
  var b = notes.getNote(argv.title);
  if (b) {
    notes.logNote(b);
  } else {
    console.log('Note not found');
  }
} else if(command === 'remove'){
  var b = notes.removeNote(argv.title);
  var message = b? 'Note was removed' : 'Note not found';
  console.log(message);
} else {
  console.log('Command not recognized');
}
