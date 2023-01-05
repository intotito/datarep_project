import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import userEvent from '@testing-library/user-event';
/**
 * The Dashboard component. Forms the main part of the application, displays information about a
 * user currently selected. 
 * @returns {JSX.Element} - View to be rendered to the user
 */
function Dashboard(props) {
  console.log("Dashboard props", props);
  // State information holding values for the selected user repository
  const [repos, setRepos] = useState(null);
  // Use Effect hook that queries the server for the selected user's repository data
  // This effect is controled by the 'props.currentUser' i.e this effect will be
  // executed once the currentUser changes. 
  useEffect(() => {
    const getRepositories = () => {
      if (props.currentUser == null) return;
      axios({
        method: "get",
        url: props.currentUser.repos_url,
        /*  headers: {
            'Accept' : 'application/vnd.github+json',
            'Authorization' : `Bearer ${pac}`,
            'Content-Type': "application/json",
        },  */
      })
        .then((response) => {
          console.log("Response from get REpos", response.data);
          setRepos(response.data);
        })
        .catch((error) => {
          console.log("Error from getRepos", error);
        })
    }
    getRepositories();
  }, [props.currentUser])


  return (
    props.currentUser && <div className="container col-md-10 col-sm-8">
      <main>
        <div className="py-5 text-center">
          <img className="d-block mx-auto mb-4" src={props.currentUser.avatar_url} alt="" width="72" height="57" />
          <h2>{props.currentUser.username}</h2>
        </div>

        <div className="row">

          <div className="col-md-7 col-lg-8">
            <h4 className="mb-3">Github User Information</h4>
            <form className="needs-validation"  >
              <div className="row g-3">


                <div className="col-sm-6">
                  <div className="input-group has-validation"> {/* 'has-validation' - removes rounded edges on the left side for some reasons I don't know */}
                    <span className="input-group-text bg-danger text-light">User ID</span>
                    <input type="text" className="form-control" id="userid" name="userid" value={props.currentUser.login} readOnly />
                    <div className="invalid-feedback">
                      {/* This div removes rounded edges on the right side for some reasons I don't know */}
                    </div>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="input-group has-validation"> {/* 'has-validation' - removes rounded edges on the left side for some reasons I don't know */}
                    <span className="input-group-text bg-danger text-light">Name</span>
                    <input type="text" className="form-control" id="name" name="name" value={props.currentUser.name} readOnly />
                    <div className="invalid-feedback">
                      {/* This div removes rounded edges on the right side for some reasons I don't know */}
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <div className="input-group has-validation">
                    <span className="input-group-text bg-danger text-light">URL</span>
                    <input type="text" className="form-control" id="url" name="url" value={props.currentUser.html_url} readOnly />
                    <div className="invalid-feedback"></div>
                  </div>
                </div>

                <div className="col-12">
                  <div className="input-group has-validation">
                    <span className="input-group-text bg-danger text-light">Company</span>
                    <input type="text" className="form-control" id="company" name="company" value={props.currentUser.company || ''} readOnly />
                    <div className="invalid-feedback"></div>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="input-group has-validation"> {/* 'has-validation' - removes rounded edges on the left side for some reasons I don't know */}
                    <span className="input-group-text bg-danger text-light">Email</span>
                    <input type="email" className="form-control" id="email" name="email" value={props.currentUser.email || ''} readOnly />
                    <div className="invalid-feedback">
                      {/* This div removes rounded edges on the right side for some reasons I don't know */}
                    </div>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="input-group has-validation"> {/* 'has-validation' - removes rounded edges on the left side for some reasons I don't know */}
                    <span className="input-group-text bg-danger text-light">Location</span>
                    <input type="text" className="form-control" id="location" name="location" value={props.currentUser.location || ''} readOnly />
                    <div className="invalid-feedback">
                      {/* This div removes rounded edges on the right side for some reasons I don't know */}
                    </div>
                  </div>
                </div>

                <div className="col-12  d-flex rounded row mt-3">

                  <span className="col-12">Count</span>

                  <div className="col-sm-4 my-3">
                    <div className="input-group has-validation"> {/* 'has-validation' - removes rounded edges on the left side for some reasons I don't know */}
                      <span className="input-group-text bg-danger text-light">Repositories</span>
                      <input type="text" className="form-control" id="repositories" name="repositories" value={props.currentUser.public_repos || '0'} readOnly />
                      <div className="invalid-feedback">
                        {/* This div removes rounded edges on the right side for some reasons I don't know */}
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4 my-3">
                    <div className="input-group has-validation"> {/* 'has-validation' - removes rounded edges on the left side for some reasons I don't know */}
                      <span className="input-group-text bg-danger text-light">Followers</span>
                      <input type="text" className="form-control" id="followers" name="followers" value={props.currentUser.followers || '0'} readOnly />
                      <div className="invalid-feedback">
                        {/* This div removes rounded edges on the right side for some reasons I don't know */}
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4 my-3">
                    <div className="input-group has-validation"> {/* 'has-validation' - removes rounded edges on the left side for some reasons I don't know */}
                      <span className="input-group-text bg-danger text-light">Following</span>
                      <input type="text" className="form-control" id="following" name="following" value={props.currentUser.following || '0'} readOnly />
                      <div className="invalid-feedback">
                        {/* This div removes rounded edges on the right side for some reasons I don't know */}
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              <hr className="my-4" />
            </form>
          </div>



          <div className="col-md-5 col-lg-4">
            <h4 className="d-flex mb-3">
              <span className="text-primary mr-4">Repositories&nbsp;</span>
              <span className="badge bg-primary rounded-pill">{props.currentUser.public_repos}</span>
            </h4>
            <div className="row  overflow-auto">
              <ul className="list-group mb-3 scrollable col-3   d-flex flex-column">
                { repos && 
                  repos.map((repo) => {
                    return (
                      <li key={repo.id} className="list-group-item d-flex">
                        <a href={'https://github.com/' + repo.full_name}>
                        <div>
                          <h6 className="my-2 text-muted">{repo.name}</h6>
                        </div></a>
                        <span className="text-muted"></span>
                      </li>
                    );
                  })
                }

              </ul>
            </div>
          </div>



        </div>
      </main>
    </div>
  );
}
export { Dashboard };