const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

const app = express()
const port = 3000

dotenv.config()

app.use(process.env.BASE_PATH, express.static(path.join(__dirname, '../../dist/apps/public')))

app.get(`${process.env.BASE_PATH}/isalive`, (req, res) => {
    res.sendStatus(200);
});

app.get(`${process.env.BASE_PATH}/isready`, (req, res) => {
    res.sendStatus(200);
});

app.get(`${process.env.BASE_PATH}/`, (req, res) => {
    res.sendFile(path.join(__dirname, '../../dist/apps/public', 'index.html'))
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})