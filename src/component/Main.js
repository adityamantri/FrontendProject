import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './Signup';
import Dashboard from './Dashboard';
// import StartPage from './LandingPage/startPage.js'
// import Navbar from './LandingPage/Navbar';

class Main extends Component {
    render() {
        return (
            <div>
                {/* <Route path="/" component={Navbar} /> */}
                {/* <Route path="/startPage" component = {StartPage} /> */}
                {/* <Route path="/login" component={Login} /> */}
                <Route path="/Signup" component={SignUp} />
                <Route path="/Signin" component={SignIn} />
                <Route path="/Dashboard" component={Dashboard}/>

            </div>
            )
        }
    }
export default Main;

