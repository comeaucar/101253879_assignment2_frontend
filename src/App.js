import React, {Component} from 'react';
import CustomNavbar from './components/CustomNavbar'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { Container } from 'react-bootstrap';
import EmployeeList from './components/EmployeeList';
import AddEmployee from './components/AddEmployee';
import Employee from './components/Employee';

class App extends Component{
  
  render(){
    return (
      <Router>
      <div className="container">
        <CustomNavbar/>
      </div>
      
      <Routes>
    <Route path="/employees" element={
    <Container style={{"margin": "100px"}}>
    <EmployeeList/>
    </Container>
    } />
    <Route path="/employees/add" element={
    <Container style={{"margin": "100px"}}>
    <AddEmployee />
    </Container>
    }/>
    <Route path='/employees/:employeeid' element={
      <Container style={{"margin": "100px"}}>
      <Employee />  
      </Container>
    }/>
    </Routes>
    

      </Router>
    );
  }
}

export default App;