import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from 'react';
import { Button, Modal, Input } from 'react-bootstrap';
import axios from 'axios'

function Home() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [users, setUsers] = useState(null)

    const [userInput, setUserInput] = useState({
        firstName: '',
        lastName: '',
        username: '',
        contact: ''
    })

    useEffect(() => {
        var config = {
            method: 'get',
            url: 'http://localhost:8081/api/users',
            headers: {}
        };

        axios(config)
            .then(function (response) {
                setUsers(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    const consoleLog = () => {
        console.log(users)
    }

    const handleInput = (name, value) => {
        setUserInput({
            ...userInput,
            [name]: value
        })
    }

    const deleteUser = (event, id) => {
        event.preventDefault();

        var config = {
            method: 'delete',
            url: 'http://localhost:8081/api/delete/'+id,
            headers: { }
          };
          
          axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            alert('user deleted')
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    const createUser = (event) => {
        event.preventDefault()

        var data = JSON.stringify({
            "firstName": userInput.firstName,
            "lastName": userInput.lastName,
            "username": userInput.username,
            "contact": userInput.contact
          });
          
          var config = {
            method: 'post',
            url: 'http://localhost:8081/api/users',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
          axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            alert('user created')
          })
          .catch(function (error) {
            console.log(error);
          });

    }

    return (

        <div class="container ">
            <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
                <div class="row ">

                    <div class="col-sm-3 mt-5 mb-4 text-gred">
                        <div className="search">
                            <form class="form-inline">
                                <input class="form-control mr-sm-2" type="search" placeholder="Search User" aria-label="Search" />

                            </form>
                        </div>
                    </div>
                    <div class="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred" style={{ color: "green" }}><h2><b>Users Details</b></h2></div>
                    <div class="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
                        <Button variant="primary" onClick={handleShow}>
                            Add New User
                        </Button>
                    </div>
                </div>
                <div class="row">
                    <div class="table-responsive " >

                        {
                            (users != null && users != undefined) ?
                                <>

                                    <table class="table table-striped table-hover table-bordered">
                                        <thead>
                                            <tr>
                                                <th>First Name</th>
                                                <th>Last Name</th>
                                                <th>Username</th>
                                                <th>Contact </th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {
                                                users.map((user, i) => {
                                                    return (
                                                        <tr key={i}>
                                                            <td>{user.firstName}</td>
                                                            <td>{user.lastName}</td>
                                                            <td>{user.username}</td>
                                                            <td>{user.contact}</td>
                                                            <td>
                                                                <a href="#" class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>
                                                                <a href="#" class="delete" title="Delete" data-toggle="tooltip" style={{ color: "red" }} onClick={(event) => deleteUser(event, user.id)}><i class="material-icons">&#xE872;</i></a>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }

                                        </tbody>
                                    </table>
                                </>
                                :
                                <>
                                    Loading...
                                </>
                        }

                    </div>
                </div>

                {/* <!--- Model Box ---> */}
                <div className="model_box">
                    <Modal
                        show={show}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Save</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form>
                                <div class="form-group">
                                    <input type="text" class="form-control" id="exampleInputFirst" placeholder="First Name" name="firstName" onChange={(event) => handleInput('firstName', event.target.value)}/>
                                </div>
                                <div class="form-group mt-3">
                                    <input type="text" class="form-control" id="exampleInputLast" placeholder="Last Name" name="lastName" onChange={(event) => handleInput('lastName', event.target.value)}/>
                                </div>
                                <div class="form-group mt-3">
                                    <input type="text" class="form-control" id="exampleInputUsername" placeholder="Username" name="username" onChange={(event) => handleInput('username', event.target.value)}/>
                                </div>
                                <div class="form-group mt-3">
                                    <input type="text" class="form-control" id="exampleInputContact" placeholder="Contact Number" name="contact" onChange={(event) => handleInput('contact', event.target.value)}/>
                                </div>

                                <button type="submit" class="btn btn-success mt-4" onClick={(event) => createUser(event)}>Add Save</button>
                            </form>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>

                        </Modal.Footer>
                    </Modal>

                    {/* Model Box Finsihs */}
                </div>
            </div>
        </div>
    );
}

export default Home;