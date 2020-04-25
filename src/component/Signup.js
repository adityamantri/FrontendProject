import React,{Component} from 'react';
import { Jumbotron,Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {Redirect} from 'react-router';

//Define a Login Component
class SignUp extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            username: "",
            password: "",
            authFlag: false,
            loginStatus: '',
            email: ''
        }
    }
    //Call the Will Mount to set the auth Flag to false
    // componentWillMount() {
    //     this.setState({
    //         authFlag: false
    //     })
    // }

    onChangeHandler = (e) => {
        const{name, value} = e.target
        console.log(e, name, value)
        this.setState({
            [name] : value
        })
    }
    //submit Login handler to send a request to the node backend
    submitSignup = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {

            UserName: this.state.username,
            Password: this.state.password,
            Email: this.state.email
        }
        //set the with credentials to true
        axios.defaults.withCredentials = false;
        //make a post request with the user data
        axios.post('http://54.184.212.199:8000/cp/signUp', data)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    this.setState({
                        authFlag: true,
                        loginStatus: 'success'
                    })
                } else {
                    this.setState({
                        authFlag: false,
                        loginStatus: 'failure'
                    })
                }
            }).catch(error => {
                console.log('Inside exception throw!!')
                this.setState({ loginStatus: 'failure' });
            })
    }

    render() {
        //redirect based on successful login
        let redirectVar = null;
        if (this.state.loginStatus) {
            redirectVar = <Redirect to="/SignIn" />
        }
        console.log('Redirected', redirectVar);
        return (
            <div style={{'margin-top': '10%'}}>
                {redirectVar}
                <div class="container">

                    <Form onSubmit={this.submitSignup}>
                        <Jumbotron>
                    <img src="https://docrdsfx76ssb.cloudfront.net/static/1587146962/pages/wp-content/uploads/2019/02/bitly.png" class="" alt="Bitly"/>
                        <FormGroup>
                                <Label for="exampleEmail">Username</Label>
                                <Input type="text" name="username" onChange = {this.onChangeHandler} id="username" placeholder="Enter Username " required/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleEmail">Email</Label>
                                <Input type="email" name="email" onChange = {this.onChangeHandler} id="exampleEmail" placeholder="email@email.com" required/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="examplePassword">Password</Label>
                                <Input type="password" name="password" onChange={this.onChangeHandler} id="examplePassword" placeholder="password" required/>
                            </FormGroup>
                            
                            <Button>SignUp</Button>
                            <br /><br /><br />
                            <FormGroup>
                            <Label> Already have an account <Link to="/Signin">Sign In</Link></Label>
                            </FormGroup>
                            </Jumbotron>
                    </Form>
                </div>
                {this.state.loginStatus === 'failure' ? (<p align='center'><font color='red'>Incorrect credentials!!</font></p>) : (<p></p>)}
            </div>
        )
    }
}
//export Login Component
export default SignUp;