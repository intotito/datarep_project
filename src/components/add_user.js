import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import * as Icon from 'react-feather';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

/**
 * The Add User Component Displays form with relevant fields to add a new user.
 * @returns {JSX.Element} - Shows Form for creating a new user in the Application. 
 */
function AddUser(props) {
    console.log("Add USer component");
    // Different states to hold user values
    const [username, setUsername] = useState('');
    const [url, setUrl] = useState('');
    const [avatar, setAvatar] = useState('');

    const navigate = useNavigate();
/**
 * @param {Object} newFriend - The new user to save
 * Sends a http post request to server with information about a new user
 * and navigates the user back to the dashboard on completion.
 */
    const saveFriendToDB = (newFriend) => {
        axios.post('http://localhost:4000/api/addfriend', newFriend)
            .then((response) => {
                console.log("Add User", response);
 //               props.setCurrentUser(newFriend);
                navigate('/dashboard');
            })
            .catch(function (error) {
                console.log(error);
            })
    }
/**
 * A callback event method that makes a http get request to fetch more
 * user information using git API. These information is used to populate
 * the user information that will be saved in the database.
 * @param {Event} event - Event object
 */
    const handleSubmitEvent = function (event) {
        event.preventDefault();

        axios({
            method: "get",
            url: `https://api.github.com/users/${url}`,
            
        }).then((response) => {
            console.log("Add user axios response", response);
            let newFriend = {
                username: username,
                id: response.data.id,
                login: response.data.login,
                avatar_url: (avatar == null || avatar == '') ? response.data.avatar_url : avatar,
                html_url: response.data.html_url,
                followers_url: response.data.followers_url,
                following_url: response.datafollowing_url,
                repos_url: response.data.repos_url,
                name: response.data.name,
                company: response.data.company,
                location: response.data.location,
                created_at: response.data.created_at,
                public_repos: response.data.public_repos,
                followers: response.data.followers,
                following: response.data.following
            }

            saveFriendToDB(newFriend);

        }).catch(error => {
            console.log(error);
        });
    }

    return (

        <form onSubmit={handleSubmitEvent}>
            <div className="row mt-5">
                <div className='col-md-8 offset-md-2 col-lg-6 offset-lg-3 form-signin'>
                    <Icon.UserPlus size={72} />
                    <h1 className="h3 mb-3 font-weight-normal">Save New User to Track</h1>

                    <div className="col-10 offset-1 my-4">

                        <div className="input-group mb-5">
                            <div className="input-group-prepend" htmlFor="username">
                                <span className="input-group-text bg-danger text-light">Username</span>
                            </div>
                            <input type="text" onChange={(e) => setUsername(e.target.value)} className="form-control" name="username" placeholder="Name of Friend" id="username" />
                        </div>

                        <div className="input-group mb-5">
                            <div className="input-group-prepend" htmlFor="url">
                                <span className="input-group-text bg-danger text-light">Github Account</span>
                            </div>
                            <input type="text" onChange={(e) => setUrl(e.target.value)} className="form-control" name="url" placeholder="gituser1" id="url" />
                        </div>

                        <div className="input-group mb-5">
                            <div className="input-group-prepend" htmlFor="avatar">
                                <span className="input-group-text bg-danger text-light">User Avatar</span>
                            </div>
                            <input type="text" onChange={(e) => setAvatar(e.target.value)} className="form-control" name="avatar" placeholder="Link to a cute avatar" id="avatar" />
                        </div>
                    </div>
                    <input type="submit" className="btn btn-dark mt-4" value="Add User" />
                </div>
            </div>
        </form >

    )
}
export { AddUser }