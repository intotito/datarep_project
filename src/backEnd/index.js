const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
const port = 4000;

app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/*
* Start service by listening on a chosen port
*/
app.listen(port, () => {
    console.log(`Server app listening on port ${port}`)
})

/*
* Service GET request from root page
*/
app.get('/', (req, res) => {
    res.send('Hello World!')
})
