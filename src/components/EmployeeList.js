import axios from "axios";
import React, { Component } from "react";
import { Table } from "react-bootstrap";
import AddEmployee from "./AddEmployee";
import Employee from "./Employee";

export default class EmployeeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      showAddForm: true,
      id: "",
      fname: "",
      lname: "",
      email: "",
      isUpdate: false,
      showEmployee: true,
    };
  }

  updateAddState = () => {
    this.setState({ ...this.state, showAddForm: false });
  };

  updateEmployeeState = (uId, firstname, lastname, uEmail) => {
    this.setState({
      ...this.state,
      showAddForm: false,
      id: uId,
      fname: firstname,
      lname: lastname,
      email: uEmail,
      isUpdate: true,
    });
  };

  updateViewEmployeeState = (uId) => {
    this.setState({ ...this.state, id: uId, showEmployee: false });
  };

  updateEmployee = (id, fname, lname, em) => {
    this.updateEmployeeState(id, fname, lname, em);
  };

  deleteEmployee(id) {
    return function () {
      console.log("Deleting " + id);
      axios
        .delete(`http://localhost:8029/api/v1/employees/${id}`)
        .then((res) => console.log(res));
      window.location.reload(false);
    };
  }

  viewEmployee(id) {
    window.location.href = "/employees/" + id;
    this.updateViewEmployeeState(id);
  }

  updateShowEmployee = () => {
    this.setState({ ...this.state, showEmployee: false });
  };

  updateTable = () => {
    fetch("/api/v1/employees")
      .then((res) => res.json())
      .then((employees) => this.setState({ ...this.state, employees }));
  };

  componentDidMount = () => {
    this.updateTable();
  };

  render() {
    return (
      <>
        {this.state.showEmployee ? (
          <>
            {this.state.showAddForm ? (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.employees.map((emp) => {
                    return (
                      <tr key={emp._id}>
                        <td>{emp.firstname}</td>
                        <td>{emp.lastname}</td>
                        <td>{emp.emailid}</td>
                        <td>
                          <button
                            onClick={(e) =>
                              this.updateEmployee(
                                emp._id,
                                emp.firstname,
                                emp.lastname,
                                emp.emailid
                              )
                            }
                            style={{ margin: "5px" }}
                            type="button"
                            className="btn btn-warning"
                          >
                            Update
                          </button>
                          <button
                            onClick={this.deleteEmployee(emp._id)}
                            style={{ margin: "5px" }}
                            type="button"
                            className="btn btn-danger"
                          >
                            Delete
                          </button>
                          <button
                            onClick={(e) => this.viewEmployee(emp._id)}
                            style={{ margin: "5px" }}
                            type="button"
                            className="btn btn-primary"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            ) : (
              <AddEmployee
                id={this.state.id}
                isUpdate={this.state.isUpdate}
                firstname={this.state.fname}
                lastname={this.state.lname}
                email={this.state.email}
              />
            )}{" "}
          </>
        ) : (
          <Employee />
        )}
      </>
    );
  }
}
