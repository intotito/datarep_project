import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
/**
 * The Header component. Displays the default header for every page on the Web Application
 * @returns {JSX.Element} - Header to be rendered on the Web Application page
 */
function Header(props) {
  console.log(props)
  const navigate = useNavigate();

 //setUser(props.user);
  const signOut = () => {
    axios.delete('http://localhost:4000/api/signout/')
      .then((response) => {
     //   setUser(null);
        props.setUser(null);
        navigate('/signin');
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  return (
    <Navbar bg="dark" variant="dark" className='row px-5'>
      <Container className='d-flex justify-content-between'>
        <Navbar.Brand href=".">Analytics</Navbar.Brand>

        {props.user && <div><Navbar.Text className='px-3'>{props.user.user.username}</Navbar.Text><Navbar.Text className='px-3'><span className="text-light" role="button" onClick={signOut}>SignOut</span></Navbar.Text></div>}

      </Container>
    </Navbar>
  );
}
export { Header };  