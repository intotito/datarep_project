const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

// Initialize Express Application
const app = express()

// Use middleware for urlencoding for post and put parameter resolving
app.use(express.urlencoded({
    extended: true
}));
// Use middleware for json encoding
app.use(express.json());
// Port for the Server Application
const port = 4000;
// Use CORS for cross-origin requests
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// Initialize Mongoose for accessing MongoDB Database Clusters
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
main().catch(err => console.log(err));
// Attempt to connect to Server and wait till connection succeeds or fails
async function main() {
    await mongoose.connect('mongodb+srv://admin:admin@cluster0.qwjlitc.mongodb.net/project?retryWrites=true&w=majority');
}
// Document schema for the User Collection
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
// Document Schema for the Friends Collection
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


// Model for accessing the Users Collection
const userModel = mongoose.model('users', userSchema);
// Model for accessing the Friends Collection
const friendsModel = mongoose.model('friends', friendsSchema);


/*
* Start service by listening on a chosen port
*/
app.listen(port, () => {
    console.log(`Server app listening on port ${port}`)
})

/**
 * Service get request at 'api/user' sends back user found and 
 * number of documents found
 */
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

/**
 * Service get request at 'api/friends/'. It retrieves
 * the list of saved friends from the database and sends back the 
 * data with the number of entries to the client. 
 */
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

/**
 * Service post request at '/api/adduser'. Creates a new user
 * and sends back transaction result to the client.
 */
app.post('/api/adduser', (req, res) => {
    console.log("Post request recieved at api/adduser", req);
    createNewUser(req.body)
        .then((data) => {
            console.log('post ok', data);
            res.status(201).send(data);
        })
        .catch((error) => {
            console.log('error post', error);
            res.status(404).send(error);
        });
});

/**
 * Service put requst at '/api/editUser/'. Modifies a given document on the collection
 * identified with the id passed as a request paramter.
 */
app.put('/api/editUser/:id', (req, res) => {
    console.log("Put request received at api/editUser");
    editUser(req)
        .then((data) => {
            console.log('put ok', data);
            res.status(200).send(data);
        })
        .catch((error) => {
            console.log('error put', error);
            res.status(404).send(error);
        })
})
/**
 * Service delete request at '/api/signout'. The basis of signing out a user on the application
 * is removing their records from the user Collection and that what this does.
 */
app.delete('/api/signout/', (req, res) => {
    console.log('Sign out');
    userModel.deleteMany({}, (err, data) => {
        if(err){
            console.log(err);
            res.status(404).send(err);
        } else {
            console.log('Sign out ok');
            res.status(200).send(data);
        }
    })
})

/**
 * Service detlete request at 'api/deleteFriend'/. Identifies a user on the collection with 
 * the id passed as a request paramter from the database.
 */
app.delete('/api/deleteFriend/:id', (req, res) => {
    console.log('Delete request recieved at aip/deleteFriend');
    deleteUser(req.params.id)
        .then((data) => {
            console.log('delete friend ok', data);
            res.status(200).send(data);
        })
        .catch(error => {
            console.log('error deleteFriend', error);
            res.status(404).send(error);
        })
})

/**
 * Service post requst at 'api/addfriend'. Adds a new entry to the Friends collection
 */
app.post('/api/addfriend', (req, res) => {
    console.log("Post request recieved at api/addfriend");
    createNewFriend(req.body)
        .then((data) => {
            console.log('add friend post ok', data);
            res.status(201).send(data);
        })
        .catch((error) => {
            console.log('error addfriend');
            res.status(404).send(error);
        })
});

/**
 * This method attempts to create a new user by adding the user information
 * to the MongoDB database. 
 * @param {body} body - request body 
 * @returns {Promise} - A promise that encapsulates the result of adding 
 * a new user to the database.
 */
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
/**
 * This method attempts to create a new friend by adding the user information
 * to the MongoDB database. 
 * @param {body} body - request body 
 * @returns {Promise} - A promise that encapsulates the result of adding 
 * a new friend to the database.
 */
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


/**
 * This method gets the Saved user of the Application
 * @returns {Promise} - A promise that encapsulates the result from 
 * querying the database.
 */
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

/**
 * This method deletes a saved user from the database. 
 * @param {String} id - The unique identification of the user to be deleted. This corresponds to 
 * '_id' field on the MongoDB Database.
 * @returns {Promise} - A promise based result of the delte operation on the database.
 */
const deleteUser = function(id){
    console.log("Delte user", id);
    return new Promise((resolve, reject) => {
        friendsModel.findByIdAndDelete({_id:id}, (err, data) => {
            if(err){
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
}

/**
 * This method attempts to modify the document identified with the request parameter
 * with data supplied through the request body. 
 * @param {Request} req - The HTTP request that contains information about the user
 * @returns {Promise} - A promise based response from udpating the database
 */
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
/**
 * This method fetches all the saved users in the MongoDB Database.
 * @returns {Promise} - A promise based response containing a list of saved friends
 * in the application.
 */
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
