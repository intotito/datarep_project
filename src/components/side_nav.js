import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import * as Icon from 'react-feather';
import { useEffect, useState } from 'react';
import axios from 'axios';

/**
 * The Header component. Displays the left side Navigation Bar of theWeb Application
 * @returns {JSX.Element} - Side Navigation bar to be rendered on the Web Application page
 */
function SideNavBar(props) {
    const [users, setUsers] = useState([]);
    const [updated, setUpdated] = useState(false);
    useEffect(() => {
        console.log("Use Effect")
        axios.get('http://localhost:4000/api/users/')
            .then((response) => {
                // Assign Response data to the arrays using useState.
                let us = [];
                response.data.forEach(u => {
                    us.push(u);
                });
                setUsers(us);
            })
            .catch(function (error) {
                console.log(error);
            })
    }, []);
    console.log(props);
    return (
        <div className="container-fluid">
            <div className="row">
                <nav className="col-md-2 d-none d-md-block bg-light sidebar">
                    <div className="sidebar-sticky">
                        <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                            <span>Logged In</span>
                            <a className="d-flex align-items-center text-muted" href="#">
                                <span data-feather="plus-circle"></span>
                            </a>
                        </h6>
                        <div className="nav-item">
                            <a className="nav-link active" href="#">
                                <Icon.Users />
                                User <span className="sr-only">(current)</span>
                            </a>
                        </div>
                        <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                                <span>Saved Users</span>
                                <a className="d-flex align-items-center text-muted" href="#">
                                    <span data-feather="plus-circle"></span>
                                </a>
                            </h6>
                        <ul className="nav flex-column pull-left">
                            {
                                users.map((user, index) => {
                                    return (
                                        <li className="nav-item" key={user._id}>
                                            <a className="nav-link" href="#">
                                                <Icon.Users />
                                                {user.username}
                                            </a>
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
                        <ul className="nav flex-column mb-2">
                            <li className="nav-item">
                                <Link to={'/adduser'} className="nav-link">
                                    <Icon.PlusCircle/>
                                    Add User
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <Icon.Edit/>
                                    Modify User
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <Icon.BarChart2/>
                                    Compare
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <span data-feather="file-text"></span>
                                    Year-end sale
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    );
}
export { SideNavBar };