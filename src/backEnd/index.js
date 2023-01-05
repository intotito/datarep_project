const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
/* // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false}))
// parse application/json
app.use(bodyParser.json())
// Using middleware to encode url for post parsing */

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json());
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
    id: Number,
    login: String,
    avatar_url: String,
    html_url: String,
    followers_url: String,
    following_url: String,
    repos_url: String,
    name: String,
    company: String,
    location: String,
    created_at: String,
    public_repos: Number,
    followers: Number,
    following: Number
});

const friendsSchema = new mongoose.Schema({
    username: String,
    id: Number,
    login: String,
    avatar_url: String,
    html_url: String,
    followers_url: String,
    following_url: String,
    repos_url: String,
    name: String,
    company: String,
    location: String,
    created_at: String,
    public_repos: Number,
    followers: Number,
    following: Number
})



const userModel = mongoose.model('users', userSchema);
const friendsModel = mongoose.model('friends', friendsSchema);

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

app.get('/api/user', (req, res) => {
    console.log("GET Request recieved at api/users")
    getSavedUser()
        .then((data) => {
            console.log('get ok', data);
            let sendBack = {
                size: data.length,
                user: data[0]
            };
            res.status(200).send(sendBack);
        })
        .catch((error) => {
            console.log('get bad', error);
            res.status(404).send(error);
        });
});

app.get('/api/friends', (req, res) => {
    console.log("Get request received at api/friends");
    getFriends()
        .then((data) => {
            let sendBack = {
                size: data.length,
                data: data
            }
            res.status(200).send(sendBack);
        })
        .catch((error) => {
            console.log('friends bad', error);
            res.status(404).send(error);
        })
})

app.post('/api/adduser', (req, res) => {
    console.log("Post request recieved at api/adduser", req);
    createNewUser(req.body)
        .then((data) => {
            console.log('post ok', data);
            res.status(200).send(data);
        })
        .catch((error) => {
            console.log('error post', error);
            res.status(500).send(error);
        });
});

app.put('/api/editUser/:id', (req, res) => {
    console.log("Put request received at api/editUser");
    editUser(req)
        .then((data) => {
            console.log('put ok', data);
            res.status(200).send(data);
        })
        .catch((error) => {
            console.log('error put', error);
            res.status(500).send(error);
        })
})

app.post('/api/addfriend', (req, res) => {
    console.log("Post request recieved at api/addfriend");
    createNewFriend(req.body)
        .then((data) => {
            console.log('add friend post ok', data);
            res.status(202).send(data);
        })
        .catch((error) => {
            console.log('error addfriend');
            res.send(error);
        })
});

const createNewUser = function (body) {
    return new Promise((resolve, reject) => {
        console.log("Create user result", body);
        userModel.create(body, (err, data) => {
            if (err) {
                reject(err);
            } else {
                console.log("User created", data);
                resolve(data);
            }
        });

    })
}

const createNewFriend = function (body) {
    return new Promise((resolve, reject) => {
        console.log("Create friend result", body);
        friendsModel.create(body, (err, data) => {
            if (err) {
                console.log('Create Friend Error', err);
                reject(err);
            } else {
                console.log("Friend created", data);
                resolve(data);
            }
        })
    })
}



const getSavedUser = function () {
    return new Promise((resolve, reject) => {
        userModel.find((err, data) => {
            console.log("User model result", data);
            if (err) {
                reject(err);
            } else {
                console.log("Saved Users", data);
                resolve(data);
            }

        })
    });
}

const editUser = function (req) {
    console.log("Edit User", req.params.id, req.body);

    return new Promise((resolve, reject) => {
        friendsModel.findByIdAndUpdate(req.params.id, req.body,
            (error, data) => {
                if (error) {
                    console.log(error);
                    reject(error);
                } else {
                    console.log('Update successful', data);
                    resolve(data);
                } 

            })
    })
}

const getFriends = function () {
    return new Promise((resolve, reject) => {
        friendsModel.find((err, data) => {
            console.log('Friend model result', data);
            if (err) {
                reject(err);
            } else {
                console.log('Friends', data);
                resolve(data);
            }
        })
    })
}
