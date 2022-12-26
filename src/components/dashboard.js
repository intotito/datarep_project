import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
/**
 * The Dashboard component. Forms the main part of the application, displays information according to selection made by user
 * @returns {JSX.Element} - View to be rendered to the user
 */
function Dashboard(props) {
  

  return (
    <div className="container col-md-10 col-sm-8">
      <main>
        <div className="py-5 text-center">
          <img className="d-block mx-auto mb-4" src="/docs/5.2/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57" />
          <h2>Checkout form</h2>
          <p className="lead">Below is an example form built entirely with Bootstrap’s form controls.
            Each required form group has a validation state that can be triggered by attempting to submit the form without completing it.</p>
        </div>

        <div className="row">

          <div className="col-md-7 col-lg-8">
            <h4 className="mb-3">Github User Information</h4>
            <form className="needs-validation"  >
              <div className="row g-3">


                <div className="col-sm-6">
                  <div className="input-group has-validation"> {/* 'has-validation' - removes rounded edges on the left side for some reasons I don't know */}
                    <span className="input-group-text bg-danger text-light">User ID</span>
                    <input type="text" className="form-control" id="userid" name="userid" />
                    <div className="invalid-feedback">
                      {/* This div removes rounded edges on the right side for some reasons I don't know */}
                    </div>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="input-group has-validation"> {/* 'has-validation' - removes rounded edges on the left side for some reasons I don't know */}
                    <span className="input-group-text bg-danger text-light">Name</span>
                    <input type="text" className="form-control" id="name" name="name" />
                    <div className="invalid-feedback">
                      {/* This div removes rounded edges on the right side for some reasons I don't know */}
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <div className="input-group has-validation">
                    <span className="input-group-text bg-danger text-light">URL</span>
                    <input type="text" className="form-control" id="url" name="url" />
                    <div className="invalid-feedback"></div>
                  </div>
                </div>

                <div className="col-12">
                  <div className="input-group has-validation">
                    <span className="input-group-text bg-danger text-light">Company</span>
                    <input type="text" className="form-control" id="company" name="company" />
                    <div className="invalid-feedback"></div>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="input-group has-validation"> {/* 'has-validation' - removes rounded edges on the left side for some reasons I don't know */}
                    <span className="input-group-text bg-danger text-light">Email</span>
                    <input type="email" className="form-control" id="email" name="email" />
                    <div className="invalid-feedback">
                      {/* This div removes rounded edges on the right side for some reasons I don't know */}
                    </div>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="input-group has-validation"> {/* 'has-validation' - removes rounded edges on the left side for some reasons I don't know */}
                    <span className="input-group-text bg-danger text-light">Location</span>
                    <input type="text" className="form-control" id="location" name="location" />
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
                      <input type="text" className="form-control" id="repositories" name="repositories" />
                      <div className="invalid-feedback">
                        {/* This div removes rounded edges on the right side for some reasons I don't know */}
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4 my-3">
                    <div className="input-group has-validation"> {/* 'has-validation' - removes rounded edges on the left side for some reasons I don't know */}
                      <span className="input-group-text bg-danger text-light">Followers</span>
                      <input type="text" className="form-control" id="followers" name="followers" />
                      <div className="invalid-feedback">
                        {/* This div removes rounded edges on the right side for some reasons I don't know */}
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4 my-3">
                    <div className="input-group has-validation"> {/* 'has-validation' - removes rounded edges on the left side for some reasons I don't know */}
                      <span className="input-group-text bg-danger text-light">Following</span>
                      <input type="text" className="form-control" id="following" name="following" />
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
              <span className="badge bg-primary rounded-pill">3</span>
            </h4>
            <div className="row  overflow-auto">
              <ul className="list-group mb-3">
                <li className="list-group-item d-flex">
                  <div>
                    <h6 className="my-0">Product name</h6>
                  </div>
                  <span className="text-muted">$12</span>
                </li>
                <li className="list-group-item d-flex">
                  <div>
                    <h6 className="my-0">Product name</h6>
                  </div>
                  <span className="text-muted">$12</span>
                </li>
                <li className="list-group-item d-flex">
                  <div>
                    <h6 className="my-0">Product name</h6>
                  </div>
                  <span className="text-muted">$12</span>
                </li>
                <li className="list-group-item d-flex">
                  <div>
                    <h6 className="my-0">Product name</h6>
                  </div>
                  <span className="text-muted">$12</span>
                </li>
              </ul>
            </div>  
          </div>



        </div>
      </main>
    </div>
  );
}
export { Dashboard };