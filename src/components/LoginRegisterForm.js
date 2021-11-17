import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

export default class LoginRegisterForm extends Component {


    constructor(props){
        super(props)

        this.state = {
            method: props.method,
            username: "",
            password: "",
            loginSuccess: false,
        }
    }

    onUsernameChange = (e) => {
        this.setState({...this.state, username: e.target.value})
    }
    
    onPasswordChange = (e) => {
        this.setState({...this.state, password: e.target.value})
    }

    onFormSubmit = (e) => {
        e.preventDefault()
        let newAdmin = {
            username: this.state.username,
            password: this.state.password
        }

    if(this.state.method === 'login'){
        axios.post('/api/v1/login', {newAdmin}).then((res) => {
            window.location.href = '/employees'
            console.log(res)
            alert("Login Success!")
        }).catch((err) => {
            if(err.response.status === 400){
                alert("Username or Password is Incorrect")
                window.location.reload()
            }
            console.log(err)
        })
    }else{
        axios.post('/api/v1/register', {newAdmin}).then((res) => console.log(res)).catch((err) => alert(err))
        window.location.href('/login')
    }
    }

  render() {
    return (
      <div>
          {this.state.loginSuccess && this.state.method ==='Successful Login' ? <h1>Hello</h1> :
          <>
          <h3 style={{"float": "right"}}>{this.state.method.toUpperCase()}</h3>
          <h3>{this.state.username}</h3>
          <h3>{this.state.password}</h3>
          <h3>{this.state.loginSuccess}</h3>
        <Form onSubmit={this.onFormSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Username"
              onChange={this.onUsernameChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              onChange={this.onPasswordChange}
            />
          </Form.Group>
          <div>
            <Button style={{ margin: "5px" }} variant="primary" type="submit">
              {this.state.method.toUpperCase()}
            </Button>
          </div>
        </Form></> }
      </div>
    );
  }
}
