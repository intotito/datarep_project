import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import * as Icon from 'react-feather';

/**
 * The Sign In Component. Displays the Sign in page to the user
 * @returns {JSX.Element} - Shows fields for user to enter relevant information
 */
function SignIn(props) {
    //   console.log(props.app_state);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
/**
 * A lifecycle hook that checks if there is an already registered user.
 * If there is a previously registered user, the page is redirected to the 
 * dashboard page automatically.
 */
    useEffect(() => {
        console.log("Use Effect")
        axios.get('http://localhost:4000/api/user/')
            .then((response) => {
                // Assign Response data to the arrays using useState.
                if (response.data.size == 0) {
                } else {
                    setUser(response.data.user);
                    props.setCurrentUser(response.data.user);
                    navigate('/dashboard');
                }
            })
            .catch(function (error) {
            })
    }, []);

    const onChangeUser = (event) => {
        setUser(event.target.value);
    }
    /**
     * Attempt to sign in a user to the Application. This method will fetch more information about 
     * the user user git API before saving relevant fields to the MongoDB database.
     */
    const attemptSignIn = (event) => {
        console.log("Attempting sign in");
        event.preventDefault();
        if (user == null || user == '') {
            return;
        }
        /*
        * Makes a HTTP post request for a new user to be created on the database.
        * The user collection expects just a single document which is the user currently
        * using the appllication.
        */
        const saveUserToDB = (newUser) => {
            axios.post('http://localhost:4000/api/adduser', newUser)
                .then((response) => {
                    console.log("Add User", response);
                    props.setCurrentUser(newUser);
                    navigate('/dashboard');
                })
                .catch(function (error) {
                    console.log(error);
                })
        }

        axios({
            method: "get",
            url: `https://api.github.com/users/${user}`,

        })
            .then((response) => {
                console.log("Sign in Response from Server", response);
                let newUser = {
                    username: user,
                    id: response.data.id,
                    login: response.data.login,
                    avatar_url: response.data.avatar_url,
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

                saveUserToDB(newUser);

            })
            .catch(error => {
                console.log(error);
            });
    }
    return (
        <div className="row">
            <div className="row">
                <div className="alert alert-warning col-8 offset-2 my-3" role="alert">
                    <ul>
                        <li> This Application allows users to view details of selected Github users</li>
                        <li> To use the The Application a vlid Github account will be provided</li>
                    </ul>
                </div>
            </div>
            <form className="form-signin col-6 offset-3 my-5">
                <Icon.PlusSquare size={72} />
                <h1 className="h3 mb-3 font-weight-normal">Please Enter your Git Id</h1>
                <label htmlFor="inputId" className="sr-only">Username</label>
                <input type="text" id="inputId" className="form-control" placeholder="gitUser1" required onChange={onChangeUser} />
                <div>
                    <img className="mt-3" src="https://seeklogo.com/images/G/github-logo-5F384D0265-seeklogo.com.png" alt="" width="72" height="72" />
                </div>
                {<Link to={'/dashboard'} className='btn btn-dark mt-5 mb-2' onClick={attemptSignIn}>Sign In</Link>}
            </form>
        </div>
    );
}
export { SignIn };