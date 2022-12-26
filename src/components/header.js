import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav } from 'react-bootstrap';
/**
 * The Header component. Displays the default header for every page on the Web Application
 * @returns {JSX.Element} - Header to be rendered on the Web Application page
 */
function Header(props) {
  // console.log(props, props.state.navs);
  return (
    <Navbar bg="dark" variant="dark" className='row px-5'>
      <Container className='d-flex justify-content-between'>
        <Navbar.Brand href="#home">Analytics</Navbar.Brand>
        
        {props.user && <div><Navbar.Text className='px-3'>{props.user.username}</Navbar.Text><Navbar.Text className='px-3'><a  href="#home">SignOut</a></Navbar.Text></div>}

      </Container>
    </Navbar>
  );
}
export { Header };