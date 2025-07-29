import React, { useState, useContext } from 'react'
import { UserContext } from "./UserContext";
import { Container, Form, Button, Alert, Card } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import "./LogIn.css"; 
const LogIn = () => {
    const [showPassword, setShowPassword] = useState(false);

    //Therritja e UserContext i cili do te mbaje te dhenave te userit
    const { setUserInfo } = useContext(UserContext);

    const nav = useNavigate()

    const [userLog, setUserLog] = useState({
        email: ""
        ,
        password: ""
    })

    const handleChange = (e) => {
        setUserLog({ ...userLog, [e.target.name]: e.target.value })
    }
    //state per shfaqen e gabimit
    const [error, setError] = useState("")
    const [alert, setAlert] = useState("")
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userLog.email) {
            setError('Email should not be empty');
            setAlert("danger")
            return;
        }
        if (userLog.password.length < 8) {
            setError('Password should have at least 8 characters!');
            setAlert("danger")
            return;
        }

        await axios.post('http://localhost:5001/user/login', userLog, {
            withCredentials: true 
       
        })
            .then((res) => {
            
                console.log(res.data);
     
                setUserInfo(res.data);
               
                nav('/')
            })
           
           .catch(err => {
    console.log("User not login", err);
    setAlert('danger');

    if (err.response) {
        if (err.response.status === 404 && err.response.data.includes('User not found')) {
            setError('Incorrect email. Please check your email and try again.');
        } else if (err.response.status === 400 && err.response.data.includes('Invalid credentials')) {
            setError('Incorrect password. Please try again.');
        } else {
            setError('Login failed. Please try again.');
        }
    } else {
        setError('Server error. Please try later.');
    }
});

    };
    return (
    <Container className="d-flex justify-content-center align-items-center my-5">
      <Card className="p-4 shadow-lg rounded-4" style={{ maxWidth: "450px", width: "100%" }}>
        <Card.Body>
          <h3 className="text-center mb-4">Welcome Back</h3>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={userLog.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type={showPassword ? "text" : "password"}
                name="password"
                value={userLog.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
              <Form.Check
                type="checkbox"
                label="Show Password"
                onChange={() => setShowPassword(!showPassword)}
                className="mt-2"
              />
            </Form.Group>

            <Button type="submit" variant="dark" className="w-100 rounded-pill">
              Login
            </Button>
          </Form>

          <div className="text-center mt-3">
            <span className="text-muted">Don't have an account? </span>
            <a href="/register">Register</a>
          </div>

          {error && (
            <Alert variant={alert} className="mt-3">
              {error}
            </Alert>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LogIn;