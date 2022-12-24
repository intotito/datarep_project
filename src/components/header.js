import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav } from 'react-bootstrap';
/**
 * The Header component. Displays the default header for every page on the Web Application
 * @returns {JSX.Element} - Header to be rendered on the Web Application page
 */
function Header(props) {
  console.log(props, props.state.navs);
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Analytics</Navbar.Brand>
        {
          props.state.navs.map((element, index) => {
            return (<Nav key={element.title}>
              <Nav.Link href={element.url}>{element.title}</Nav.Link>
            </Nav>);
          })
        }

      </Container>
    </Navbar>
  );
}
export { Header };