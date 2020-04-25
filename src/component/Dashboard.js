import React, { Component } from 'react';
import { Table, Jumbotron, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from 'axios';
import { Redirect } from 'react-router';
import Navbar from './Navbar'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Bar } from 'react-chartjs-2';


class Dashboard extends Component {
    //call the constructor method
    constructor(props) {
        super(props);
        //maintain the state required for this component
        this.state = {
            email: '',
            trendlinks: [],
            show: false,
            longURL: "",
            shortLinkArray: [],
            hitsArray: []
        }
    }
    //Call the Did Mount to set the ip of trend sever


    componentDidMount() {

        axios.post('http://52.41.236.15:3000/trends', { email: localStorage.getItem('email') })
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    let arr = []
                    let shortLinkArr = []
                    let hitsArr = []
                    console.log(response.data.links)
                    let i = 0
                    response.data.links.sort((a, b) => (a.hits > b.hits) ? -1 : 1)
                    response.data.links.forEach(element => {
                        arr.push(
                            <tr>
                                <th scope="row">{++i}</th>
                                <td>{element.originalLink}</td>

                                <td>{element.ShortLink + "  "}
                                    <CopyToClipboard text={"http://54.184.212.199:8000/lr/" + element.ShortLink}
                                        onCopy={() => this.setState({ copied: true })}>
                                        <button class="btn btn-primary btn-xs">Copy Link</button>
                                    </CopyToClipboard></td>
                                <td>{element.hits}</td>
                            </tr>
                        )
                        shortLinkArr.push(element.ShortLink)
                        hitsArr.push(element.hits)
                    });
                    this.setState({
                        trendlinks: arr,
                        shortLinkArray: shortLinkArr,
                        hitsArray: hitsArr
                    })
                }
            }).catch(error => {
                console.log('Inside exception throw!!')
                this.setState({ loginStatus: 'failure' });
            }
            )
    }


    createLink = (e) => {
        e.preventDefault()
        console.log("longURL", this.state.longURL)
        var pattern = new RegExp('/^(ftp|http|https):\/\/[^ "]+$/');
            
        if (this.state.longURL=="" || this.state.longURL.length==0 || pattern.test(this.state.longURL)) {
            alert("Not a valid input. \n Try something like https://www.google.com/")
        } else {
            axios.post('http://54.184.212.199:8000/cp/createBitly', {
                email: localStorage.getItem('email'),
                OriginalLink: this.state.longURL
            })
                .then(response => {
                    console.log("Status Code : ", response.status);
                    if (response.status === 200) {
                        let arr = []
                        console.log(response.data)
                        this.setState({ message: `  Short Link: ${response.data.shortLink}` })
                    } else {
                        console.log("failed to create bitly from backend")
                    }
                }).catch(error => {
                    console.log('Inside exception throw!!')
                })
        }
    }

    handleShow = () => {
        this.setState({ show: !this.state.show })
    }

    onChangeHandler = (e) => {
        const { name, value } = e.target
        console.log(e, name, value)
        this.setState({
            [name]: value
        })
    }

    close = () => {
        console.log("closing")
        window.location.reload()
    }

    render() {
        //redirect based on successful login
        let redirectVar = null;
        if (localStorage.getItem('email') === null) {
            redirectVar = <Redirect to="/signIn" />
        }
        // console.log("shortLinkArray", this.shortLinkArray)
        // console.log(this.hitsArray.length,"hitsArray", this.hitsArray)

        let data = {
            labels: this.state.shortLinkArray,
            datasets: [{
                label: "Trending Links Analysis",
                backgroundColor: 'rgb(91, 192, 222)',
                borderColor: 'rgb(255, 99, 132)',
                data: this.state.hitsArray,
            }]
        }

        console.log('Redirected', redirectVar);
        return (
            <div>
                <Navbar />
                {redirectVar}
                <div class="jumbotron jumbotron-fluid">
                    <div class="container">
                        {/* <Jumbotron> */}
                        <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Create New Bitly</button>
                        <br />
                        <br />
                        <h2> All Links</h2>
                        <div class="modal fade" id="myModal" role="dialog">
                            <div class="modal-dialog modal-lg">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                                        <h4 class="modal-title">Create Bitly</h4>
                                    </div>
                                    <div class="modal-body">
                                    <form role="form" id="newModalForm" onSubmit={this.createLink}>
                                    <div class="form-group">
                                        <h4 class="modal-title"> Enter Long URL</h4>
                                        <input type='URL' name="longURL" class="form-control" placeholder="Use complete url link https://www.google.com/" onChange={this.onChangeHandler} required></input>
                                    </div>
                                    <h4>{this.state.message}</h4>
                                    <div class="modal-footer">
                                        <button class="btn btn-primary" type = "submit" >Create</button>
                                        <button type="button" class="btn btn-default" onClick={this.close} >Close</button>
                                    </div>
                                    </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br />
                        <Table dark>
                            <thead class="thead-dark">
                                <tr>
                                    <th>#</th>
                                    <th>Original Link</th>
                                    <th>Short Link</th>
                                    <th>Hits</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.trendlinks}
                            </tbody>
                        </Table>
                        {/* </Jumbotron> */}
                        < Bar data={data} />
                    </div>
                </div>
                {/* {this.state.loginStatus === 'failure' ? (<p align='center'><font color='red'>Incorrect credentials!!</font></p>) : (<p></p>)} */}
            </div>
        )
    }
}
//export Login Component
export default Dashboard;