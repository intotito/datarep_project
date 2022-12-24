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

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb+srv://admin:admin@cluster0.qwjlitc.mongodb.net/project?retryWrites=true&w=majority');


    // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}
const userSchema = new mongoose.Schema({
    username: String,
    url: String,
    avatar: String
});




const userModel = mongoose.model('users', userSchema);

/* 
userModel.create({
    username: 'intotito',
    url: 'https://github.com/intotito',
    avatar: 'https://variety.com/wp-content/uploads/2020/08/avatar-the-last-airbender-3.jpg?w=1000'
}); */

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
});

app.get('/api/users', (req, res) => {
    console.log("GET Request recieved at api/users")
    getSavedUsers()
    .then((data) => {
        console.log('get ok', data);
        res.status(200).send(data);
    })
    .catch((error) => {
        console.log('get bad', error);
        res.status(404).send(error);
    });
})

const getSavedUsers = function(){
    return new Promise((resolve, reject) => {
        userModel.find((err, data) => {
            console.log("User model result", data);
            if(err){
                reject(err);
            } else {
                console.log("Saved Users", data);
                resolve(data);
            }
            
        })
    });
}
