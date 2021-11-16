//import React from 'react';
import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom'


const DemoRouter = () => {

const Welcome = () => {
    return (
        <div>
          <h1>Welcome</h1>
          
    </div>
      );
        };


const Person = () => {
    return (
        <div>
          <h1>Person</h1>
        </div>
      );
        };

        const Menunav = () => {
          return (
              <div>
                <BrowserRouter>
        <nav>
          <h1>My Articles</h1>
          <NavLink exact to="/Welcome">Welcome</NavLink>
          <NavLink to="/Person">About</NavLink>
          
        </nav>

        <Routes>
          <Route exact path="/">
            <Welcome />  
          </Route>
          <Route path="/Person">
            <Person />  
          </Route>
          
        </Routes>

      </BrowserRouter>
                </div>
            );
              };


    return (
        <div>
            <Menunav/>
        </div>
    );
};

export default DemoRouter;