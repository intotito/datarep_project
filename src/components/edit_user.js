import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

/**
 * The Edit User Component Displays form with relevant fields to edit an existing new user.
 * @returns {JSX.Element} - Shows Form for creating a new user in the Application. 
 */
function EditUser(props) {
    console.log("Add USer component", props.currentUser);
    // State variable to hold user informatioin
    const [username, setUsername] = useState(props.currentUser.username);
    const [url, setUrl] = useState(props.currentUser.html_url);
    const [avatar, setAvatar] = useState(props.currentUser.avatar_url);


    const navigate = useNavigate();
    const handleSubmitEvent = function (event) {
        event.preventDefault();
        const editedUser = {
            username: username,
            html_url: url,
            avatar_url: avatar
        }
        console.log("form submitted");
        console.log('New user', editedUser);
        axios.put("http://localhost:4000/api/edituser/" + props.currentUser._id, editedUser)
            .then((res) => {
                console.log(res);
                navigate('/dashboard');
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (

        <form onSubmit={handleSubmitEvent}>
            <div className="row mt-5">
                <div className='col-md-8 offset-md-2 col-lg-6 offset-lg-3 form-signin'>
                    <Icon.Edit3 size={72} />
                    <h1 className="h3 mb-3 font-weight-normal">Edit Saved User</h1>

                    <div className="col-10 offset-1 my-4">

                        <div className="input-group mb-5">
                            <div className="input-group-prepend" htmlFor="username">
                                <span className="input-group-text bg-danger text-light">Username</span>
                            </div>
                            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control" name="username" placeholder="Name of Friend" id="username" />
                        </div>

                        <div className="input-group mb-5">
                            <div className="input-group-prepend" htmlFor="url">
                                <span className="input-group-text bg-danger text-light">Github URL</span>
                            </div>
                            <input type="text"  value={url} onChange={(e) => setUrl(e.target.value)} className="form-control" name="url" placeholder="https://github.com/gitUser2" id="url" />
                        </div>

                        <div className="input-group mb-5">
                            <div className="input-group-prepend" htmlFor="avatar">
                                <span className="input-group-text bg-danger text-light">User Avatar</span>
                            </div>
                            <input type="text" value={avatar} onChange={(e) => setAvatar(e.target.value)} className="form-control" name="avatar" placeholder="Link to a cute avatar" id="avatar" />
                        </div>
                    </div>
                    <input type="submit" className="btn btn-dark mt-4" value="Add User" />
                </div>
            </div>
        </form >

    );
}
export { EditUser };