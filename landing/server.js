const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
const expressStaticGzip = require('express-static-gzip')

dotenv.config()

const basePath = process.env.BASE_PATH
const buildPath = path.join(path.resolve(__dirname, './dist'))
const app = express()
const port = 3000

app.use(
    basePath,
    expressStaticGzip(`${buildPath}`, {
        enableBrotli: true,
        orderPreference: ['br']
    })
)

app.get(`${basePath}/isAlive|${basePath}/isReady`, (req, res) => {
    res.send('OK')
})

app.listen(port, () => { console.log('Listening on port 3000')})