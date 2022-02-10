const express = require('express')
const app = express()
const port = 2022
const path = require('path')

// Setter static folder

app.use(express.static(path.join(__dirname, '../../dist/apps/frontend')))

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

app.get('/isalive', (req, res) => {
    res.sendStatus(200)
})

app.get('/isready', (req, res) => {
    res.sendStatus(200)
})

app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, '../../dist/apps/frontend', 'index.html'))
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})