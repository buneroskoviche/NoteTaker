const { json } = require('body-parser');
const fs = require('fs');
const uniqid = require('uniqid');
const path = require('path');
const notes = require('../db/db.json');

module.exports = (app) => {

    app.get('/api/notes', (req, res) => res.json(notes));

    // Response to post request
    app.post('/api/notes', (req, res) => {
        // Create a new note object with a unique id
        const newNote = {
            ...req.body,
            id: uniqid(),
        };

        let notesArr;
        try {
            const data = fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf-8');
            notesArr = JSON.parse(data);
        } catch (err) {
            console.log('Trouble parsing JSON', err)
        }

        notesArr.push(newNote);
        console.log(notesArr);
        fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(notesArr, null, 2), err => {
            err ? res.json(err) : res.json(notes);
        });

    });

    
}