
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Header } from './components/header';
import { useState } from 'react';
import { Footer } from './components/footer';
import {SignIn} from './components/SignIn';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {
  const [/**
    * @type {Object} - React hook object that maintains the current state of the Application
    * @property {Number} status - Maintains the current User state. 0 - Not Logged in, 1 -Logged In
    * @property {Array<Object>} navs - Array of objects that determine what to show on the Navigation bar. 
    */status,
    setStatus] = useState({
      status: 0,
      navs: [
        { title: 'Sign In', url: '#' }
      ],
    });
  console.log(status);
  return (
    <div className="App">
      <Header state={status}/>
      <BrowserRouter>
        {
        /* Three different pages of the Web Application.
          * 1 - Main Page that displays the MainComponent, Header and Footer.
          * 2 - /create Page that displays the Create component.
          * 3 - /read Page that displays the Read component.
          */}
        <Routes>
          <Route path="/" element={<SignIn/>} />
         
          {/* 
            <Route path="/create" element={<Create/>} />
            <Route path="/edit/:id" element={<Edit/>}/> */}
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>

  );
}

export default App;
