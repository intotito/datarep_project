import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

/**
 * The Sign In Component. Displays the Sign in page to the user
 * @returns {JSX.Element} - Shows fields for user to enter relevant information
 */
function SignIn(props) {
    console.log(props.app_state);
    return (
        <div className="row">
            <div className="row">
                <div className="alert alert-warning col-8 offset-2 my-3" role="alert">
                    <ul>
                        <li> This Application allows users to monitor and compare activities of selected Github users</li>
                        <li> To use this app which makes use of extensive GitHub API, users are expected to provide their private Token</li>
                        <li> If you don't have a Token, you can generate one from the <a href='https://github.com'>GitHub</a> website</li>
                    </ul>
                </div>
            </div>
            <form className="form-signin col-6 offset-3 my-5">
                <img className="mb-4" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72" />
                <h1 className="h3 mb-3 font-weight-normal">Please Enter your Git Id</h1>
                <label htmlFor="inputId" className="sr-only">Username</label>
                <input type="email" id="inputId" className="form-control" placeholder="gitUser1" required/>
                <label htmlFor="inputToken" className="sr-only">Personal Token</label>
                <input type="password" id="inputToken" className="form-control" placeholder="Password" />
                <div className="checkbox mb-3">
                    <label>
                        <input type="checkbox"/> Provide Token on request
                    </label>
                </div>
                <Link to={'/dashboard'} className='btn btn-dark' onClick={()=>{
                    props.app_state(
                        {
                                status: 1,
                                navs: [
                                  { title: 'Home', url: './awumen' },
                                  {title: 'Sign Out', url: '#'},
                                ],
                        }
                    );
                }}>Sign In</Link>
            </form>
        </div>
    );
}
export { SignIn };