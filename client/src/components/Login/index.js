import React, { Component } from 'react'
import { Button, Form } from 'react-bootstrap';
import {
    withRouter
} from "react-router-dom";

import "./styles.css"
import image from "../../assets/login.png"

class Login extends Component {
    render() {
        return (
            <div className="login">
                <div className="login-card">
                    <img
                        src={image}
                        className="login-card-icon"
                    />
                    <h1 className="login-header">
                        <span className="green-text">Grow </span>
                        with us
                    </h1>
                    <Form className="login-card-form">
                        <Form.Group>
                            <Form.Control size="lg" type="text" placeholder="Username" className="login-input" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control size="lg" type="password" placeholder="Password" className="login-input" />
                        </Form.Group>
                    </Form>
                    <Button
                        className="login-btn"
                        size="lg"
                        variant="success"
                        onClick={() => {
                            this.props.history.push("/home")
                        }}
                    > Log In</Button>
                </div>
            </div>
        )
    }
}

export default withRouter(Login);