const path = require('path');

module.exports = (app) => {
    // Welcome page
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });
    // Path for the Notes page
    app.get('/notes', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/notes.html'));
    });
    // Path for the JavaScrip
    app.get('/assets/js/index.js', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/assets/js/index.js'))
    });
    // Path for the CSS
    app.get('/assets/css/styles.css', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/assets/css/styles.css'))
    });
}