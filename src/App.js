
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Header } from './components/header';
import { useState } from 'react';
import { Footer } from './components/footer';
import { SignIn } from './components/SignIn';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { SideNavBar } from './components/side_nav';
import { AddUser } from './components/add_user';
import { EditUser } from './components/edit_user';
import { Dashboard } from './components/dashboard';
import axios from 'axios';
import { useEffect } from 'react';



/**
 * Base Functional Component of the Application. Hold global variables that are
 * passed to other component for update scheduling and record keeping.
 * @returns 
 */
function App() {
  const [user, setUser] = useState(null);
  const [friends, setFriends] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
/**
 * Lifecycle hook to attempt initializing the user on creation of the app.
 */

  useEffect(() => {
    console.log("Use Effect")
    const getUser = async () => {
      const response = await axios.get('http://localhost:4000/api/user/');
      if (response.data.size != 0) {
        setUser(response.data);
      }

      console.log("Finally", response.data);
    };
    getUser().catch((error) => {
      console.log(error);
    })

  }, []);




  return (

    <div className="App">

      <BrowserRouter>
        <Header user={user}  setUser={setUser} />
        {
        /* Three different pages of the Web Application.
          * 1 - Main Page Signin
          * 2 - Dashboard
          * 3 - Edit user
          * 4 - Add new user
          */}
        <Routes>
          <Route path="/signin" element={<SignIn setCurrentUser={setCurrentUser}/>} />
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<div className="row"><SideNavBar friends={friends} setFriends={setFriends} currentUser={currentUser} setCurrentUser={setCurrentUser} user={user} /><Dashboard currentUser={currentUser} /></div>} />
          <Route path="/adduser" element={<AddUser setFriends={setFriends} />} />
          <Route path='/edituser' element={<><EditUser setFriends={setFriends} currentUser={currentUser} /></>} />
          {/* 
            <Route path="/create" element={<Create/>} />
            <Route path="/edit/:id" element={<Edit/>}/> */}
        </Routes>
        <Footer />
      </BrowserRouter>

    </div>

  );
}

export default App;
