const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const expressStaticGzip = require("express-static-gzip");

dotenv.config()

const app = express()
const port = 3000
const basePath = process.env.BASE_PATH
const buildPath = path.resolve(__dirname, "../../dist/apps/public")


app.use(basePath, expressStaticGzip(buildPath, {
    enableBrotli: true,
    orderPreference: ["br"]
}))

app.get(`${basePath}/isalive`, (req, res) => {
    res.sendStatus(200);
});

app.get(`${basePath}/isready`, (req, res) => {
    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})