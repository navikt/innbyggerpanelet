const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

const app = express()
const port = 3000

dotenv.config()

const buildPath = path.resolve(__dirname, '../../dist/apps/public')

app.use(process.env.BASE_PATH, express.static(buildPath, {index: false}))

app.get(`${process.env.BASE_PATH}/isalive`, (req, res) => {
    res.sendStatus(200);
});

app.get(`${process.env.BASE_PATH}/isready`, (req, res) => {
    res.sendStatus(200);
});

app.use(/^(?!.*\/(internal|static)\/).*$/, `${buildPath}/index.html`)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})