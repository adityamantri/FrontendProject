import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


//create the Navbar Component
class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state= {
            modal: false,
            createnewlink: null
        }
        this.handleLogout = this.handleLogout.bind(this);
    }

    //handle logout to destroy the cookie
    handleLogout = () => {
        localStorage.clear();

    }

    render() {
        //if Cookie is set render Logout Button
        let navLogin = null;
        // if(cookie.load('cookie')){
        //     // console.log("Able to read cookie");
            navLogin = (
                <ul class="nav navbar-nav navbar-right">
                        <li><Link to="/SignIn" onClick = {this.handleLogout}><span class="glyphicon glyphicon-user"></span>Logout</Link></li>
                </ul>
            );
        // }else{
        //     //Else display login button
        //     console.log("Not Able to read cookie");
        //     navLogin = (
        //         <ul class="nav navbar-nav navbar-right">
        //                 <li><Link to="/login"><span class="glyphicon glyphicon-log-in"></span> Login</Link></li>
        //         </ul>
        //     )
        // }
        let redirectVar = null;
        // if(cookie.load('cookie')){
        //     redirectVar = <Redirect to="/home"/>
        // }
        


        return (
            <div>
                {redirectVar}
                <nav class="navbar navbar-inverse">
                    <div class="container-fluid">
                        <div class="navbar-header">
                            <a class="navbar-brand"><img height="30" width="65" src="https://docrdsfx76ssb.cloudfront.net/static/1587146962/pages/wp-content/uploads/2019/02/bitly.png" class="" alt="Bitly"/></a>
                        </div>
                        {/* <ul class="nav navbar-nav"> */}
        <div class="nav navbar-nav"><h4>Hi {localStorage.getItem('UserName')}</h4></div>
                        
                        {navLogin}
                    </div>
                </nav>
                
                {this.state.createnewlink}
            </div>
        )
    }
}

export default Navbar;