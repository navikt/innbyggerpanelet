const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');
const dotenv = require('dotenv');

dotenv.config();

// Setter static folder

app.use(express.static(path.join(__dirname, '../../dist/apps/frontend')));

app.use('/api', createProxyMiddleware({ target: process.env.API_URL, changeOrigin: true }));
// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

app.get('/isalive', (req, res) => {
    res.sendStatus(200);
});

app.get('/isready', (req, res) => {
    res.sendStatus(200);
});

app.get('/innbyggerpanelet', (req, res) => {
    res.sendFile(path.join(__dirname, '../../dist/apps/frontend', 'index.html'));
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
