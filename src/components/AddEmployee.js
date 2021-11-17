import axios from 'axios';
import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import EmployeeList from './EmployeeList';

export default class AddEmployee extends Component {
    
    constructor(props){
        super(props)
            this.state = {
            isUpdate: props.isUpdate,
            id: props.id,
            firstname: props.firstname,
            lastname: props.lastname,
            email: props.email,
            successSubmit: false
        }
    }

    updateFirstname = (e) => {
        this.setState({...this.state, firstname: e.target.value})
    }

    updateLastname = (e) => {
        this.setState({...this.state, lastname: e.target.value})
    }

    updateEmail = (e) => {
        this.setState({...this.state, email: e.target.value})
    }

    cancelInsert = (e) => {
        window.location.href='/employees'
    }

    submitForm = (e) => {
       
        // code to add new user
        let newUser = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            emailid: this.state.email
        }

        if(this.state.isUpdate){
            // code to update

            axios.put(`http://localhost:8029/api/v1/employees/${this.state.id}`, {newUser})
            .then(res => console.log(res))
            .then(this.setState({...this.state, successSubmit: true}))
            .catch(err => console.log(err))

        }else
        {
        axios.post("http://localhost:8029/api/v1/employees", {newUser})
        .then(res => console.log(res))
        .then(this.setState({...this.state, successSubmit: true}))
        .catch((err) => {
            if(err.response.status === 500){
                alert("Form had Invalid Values")
                window.location.href='/employees/add'
            }
        })
        }
    }

    
    render() {
        return (
            <>
            {this.state.successSubmit ? <EmployeeList /> :
            <Form onSubmit={this.submitForm}>
    <Form.Group className="mb-3" >
    <Form.Label>First Name</Form.Label>
    <Form.Control type="text" placeholder="Enter first name" onChange={this.updateFirstname} value={this.state.firstname} required/>
    <Form.Label>Last Name</Form.Label>
    <Form.Control type="text" placeholder="Enter last name" onChange={this.updateLastname} value={this.state.lastname} required/>
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" onChange={this.updateEmail} value={this.state.email}/>
  </Form.Group>
  <div>
  <Button style={{"margin": "5px"}} variant="primary" type="submit">
    Submit
  </Button>
  <Button style={{"margin": "5px"}} variant="danger" onClick={this.cancelInsert}>
      Cancel
  </Button>
  </div>
</Form> }
</>
        )
    }
}
