import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import * as Icon from 'react-feather';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



/**
 * The Header component. Displays the left side Navigation Bar of theWeb Application
 * @returns {JSX.Element} - Side Navigation bar to be rendered on the Web Application page
 */
function SideNavBar(props) {
    console.log("side nav-bar loaded");
    const [friends, setFriends] = useState([]);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const friendSelected = function (id) {
        props.setCurrentUser(props.friends.find((f) => {
            return f.id == id;
        }));
    }

    const userSelected = () => {
        console.log("Weting de happen", user)
        props.setCurrentUser(user);
    }

    const deleteUser = () => {
        if (user.id != props.currentUser.id) {
            if (window.confirm("Delete User '" + props.currentUser.username + "'?")) {
                console.log('will attempt delte')
                axios.delete('http://localhost:4000/api/deleteFriend/' + props.currentUser._id)
                    .then(() => {
                        props.setCurrentUser(user);
                        window.location.reload();
                    }).catch(error => {
                        console.log(error);
                    });
            }
        }
    }

    useEffect(() => {
        console.log("Use Effect")
        axios.get('http://localhost:4000/api/user/')
            .then((response) => {
                // Assign Response data to the arrays using useState.
                console.log("Weting", response);
                if (response.data.size == 0) {
                    console.log("Before navigate", response.data);
                    navigate('/signin');
                }
                setUser(response.data.user);
                props.setCurrentUser(response.data.user);

                axios.get('http://localhost:4000/api/friends')
                    .then((response) => {
                        console.log('Friends request', response.data);
                        if (response.data.size > 0) {
                            props.setFriends(response.data.data);
                        }
                    })
                    .catch((error) => {
                        console.log('error fetching friends', error);
                    })
            })
            .catch(function (error) {
                console.log(error);
                navigate('/signin');
            })
    }, []);
    console.log(props);
    console.log("User", user);
/*     if (user == null)
        return (<Navigate to="/signin" />);
 */    return (
        <div className="container col-md-2 col-sm-4">
            <div className="row d-flex flex-column sidebar">
                <nav className="col-12 bg-light sidebar">
                    <div>
                        <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                            <span>Logged In</span>
                            <a className="d-flex align-items-center text-muted" href="#">
                                <span data-feather="plus-circle"></span>
                            </a>
                        </h6>
                        <div className="nav-item d-flex ps-3 pt-2">
                            <a className="nav-link active" href="">
                                <Icon.Users />
                                <span className="ms-2" onClick={() => { userSelected() }}>User
                                    {(user && (user.id == props.currentUser.id)) && <span className="ms-2 text-light badge bg-primary rounded-pill">{'(' + user.username + ')'}</span>}
                                    {(user && (user.id != props.currentUser.id)) && <span >{'(' + user.username + ')'}</span>}
                                </span>
                            </a>
                        </div>
                        <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                            <span>Saved Users</span>
                            <a className="d-flex align-items-center text-muted" href="#">
                                <span data-feather="plus-circle"></span>
                            </a>
                        </h6>
                        <ul className="nav d-flex flex-column ps-3 pt-2">
                            {
                                props.friends && props.friends.map((user, index) => {
                                    return (
                                        <li className="nav-item" key={user._id}>
                                            <div className="d-flex">
                                                <a className="nav-link" href="#">
                                                    <Icon.Users />
                                                    {(user.id == props.currentUser.id) && <span onClick={() => { friendSelected(user.id) }} className="ms-2 text-light badge bg-primary rounded-pill">{user.username}</span>}
                                                    {(user.id != props.currentUser.id) && <span onClick={() => { friendSelected(user.id) }} className="ms-2 text-dark">{user.username}</span>}
                                                </a>
                                            </div>
                                        </li>
                                    );
                                })
                            }
                        </ul>

                        <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                            <span>Actions</span>
                            <a className="d-flex align-items-center text-muted" href="#">
                                <span data-feather="plus-circle"></span>
                            </a>
                        </h6>
                        <ul className="nav mb-2 ms-2 d-flex flex-column">
                            <li className="nav-item">
                                <div className="d-flex">
                                    <Link to={'/adduser'} className="nav-link">
                                        <Icon.PlusCircle />
                                        <span className="ms-2">Add User</span>
                                    </Link>
                                </div>
                            </li>
                            <li className="nav-item">
                                <div className="d-flex">
                                    <Link to={(user != null && user.id == props.currentUser.id ? '' : '/edituser')} className="nav-link">
                                        <Icon.Edit />
                                        {(user != null && user.id != props.currentUser.id) && <span className="ms-2">Modify User</span>}
                                        {(user != null && user.id == props.currentUser.id) && <span className="ms-2 text-muted">Modify User</span>}
                                    </Link>
                                </div>
                            </li>
                            <li className="nav-item">
                                <div className="d-flex">
                                    <Link onClick={deleteUser} to={(user != null && user.id == props.currentUser.id ? '#' : '#')} className="nav-link">
                                        <Icon.XCircle />
                                        {(user != null && user.id != props.currentUser.id) && <span className="ms-2">Delete User</span>}
                                        {(user != null && user.id == props.currentUser.id) && <span className="ms-2 text-muted">Delete User</span>}
                                    </Link>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    );
}
export { SideNavBar };