const { json } = require('body-parser');
const fs = require('fs');
const uniqid = require('uniqid');
const path = require('path');


module.exports = (app) => {

    app.get('/api/notes', (req, res) => {
        const notes = require('../db/db.json');
        res.json(notes)
    });

    // Response to post request
    app.post('/api/notes', (req, res) => {
        // Create a new note object with a unique id
        const newNote = {
            ...req.body,
            id: uniqid(),
        };
        // Read the db json and apply to a variable
        const notesArr = readData();

        // Put the new note into the array
        notesArr.push(newNote);
        
        try {
            saveData(notesArr);
            res.json(notesArr);
        } catch (error) {
            console.log(error);
            res.json(error);
        }
    });

    app.delete('/api/notes/:id', (req, res) => {
        // Get the 'id' parameter from the request
        const noteToDeleteID = req.params.id;
        // Read the data from file
        const notesArr = readData();
        // Loop through the data and remove any elements with a matching id
        for (let i = 0; i < notesArr.length; i++) {
            if(notesArr[i].id === noteToDeleteID) {
                notesArr.splice(i, 1);
            }
        }
        // Save new array to file
        saveData(notesArr);
        // Respond with the notes array
        res.json(notesArr);
    });

    
}

const readData = () => {
    try {
        const data = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf-8'));
        return data;
    } catch (err) {
        console.log('Trouble parsing JSON', err);
        return err;
    }
}

const saveData = (array) => {
    try {
        fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(array, null, 2));
        return true;
    } catch (err) {
        console.log('Trouble saving JSON', err);
        return err;
    }
}