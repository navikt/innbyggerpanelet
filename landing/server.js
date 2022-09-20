const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
const expressStaticGzip = require('express-static-gzip')

dotenv.config()

const app = express()

const basePath = process.env.BASE_PATH
const buildPath = path.join(path.resolve(__dirname, './dist'))


app.use(basePath, express.static(buildPath, { index: false }))

app.get(`${basePath}/isAlive|${basePath}/isReady`, (req, res) => {
    res.send('OK')
})
app.use(/^(?!.*\/(internal|static)\/).*$/, (req, res) => res.sendFile(`${buildPath}/index.html`))

app.listen(3000, () => { console.log('Listening on port 3000')})