import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav } from 'react-bootstrap';
/**
 * The Header component. Displays the default header for every page on the Web Application
 * @returns {JSX.Element} - Header to be rendered on the Web Application page
 */
function Footer(props) {
    return (
        <div className="w-100 bg-danger footer row">
            <span>Data Representation and Querying - MERN Single Page Application 2022</span>
        </div>
    );
}
export { Footer };