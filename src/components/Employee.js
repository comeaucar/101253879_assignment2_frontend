import React, {useState, useEffect} from 'react'
import Card from 'react-bootstrap/Card'
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import axios from 'axios';

export default function Employee() {

    let {employeeid} = useParams();
    
    const [empState, setEmp] = useState({
        fname: "",
        lname: "",
        email: ""
    })
    


   useEffect(() => {
        axios.get(`http://localhost:8029/api/v1/employees/${employeeid}`)
        .then((res) => {
            const nEmp = {
                fname: res.data.firstname,
                lname: res.data.lastname,
                email: res.data.emailid
            }
            setEmp(nEmp)
        })
        .catch(e => console.log(e))
    }, [employeeid]);

    return (
        <Card style={{ width: '18rem' }}>
  <Card.Body>
    <Card.Title>{empState.fname} {empState.lname}</Card.Title>
    <Card.Subtitle className="mb-2 text-muted">{employeeid}</Card.Subtitle>
    <ListGroup.Item>{empState.email}</ListGroup.Item>
    <Link to="/employees">Back</Link>
  </Card.Body>
</Card>
    )
}
