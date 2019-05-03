import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export default class Login extends Component {
    state = {
        username: '',
        password: '',
        errorMessage: ''

    };

    handleSubmit = event => {
        event.preventDefault();
        const { username, password } = this.state;
        axios({
            url: "/authenticate/signin",
            method: "POST",
            data: {
                username,
                password,

            }
        })
            .then(response => {
                const isAuthenticated = response.data.isAuthenticated;
                window.localStorage.setItem('isAuthenticated', isAuthenticated);
                this.props.history.push("/profile");
            })
            .catch(error => {
                this.setState({
                    errorMessage: error.response.data.message
                });
            });
    }
    handleChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };
    render() {

        const isAuthenticated = window.localStorage.getItem('isAuthenticated');
        if (isAuthenticated) {
            return <Redirect to='/profile' />
        }

        //JSX
        return (
            <div>
                <h2>Login Component</h2>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="username" onChange={this.handleChange} />
                    <input type="password" name="password" onChange={this.handleChange} />

                    <button>Login</button>
                </form>
                <p>{this.state.errorMessage}</p>
            </div >
        );
    }

}