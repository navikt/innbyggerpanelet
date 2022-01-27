const express = require('express');
const app = express();
const port = process.env.SERVER_PORT || 2022;
const index = (req, res) => res.sendFile(require('path').join(__dirname, 'dist/index.html'));
app.use(express.static('dist'));
// Add routes here
app.get('/', index);

app.get('/isalive', (req, res) => {
    res.sendStatus(200);
});

app.get('/isready', (req, res) => {
    res.sendStatus(200);
});

app.listen(port, () => console.log(`Server starting on port ${port}`));