import React, { Component } from 'react';
import axios from 'axios';


export default class Signup extends Component {
    state = {
        username: '',
        password: ''

    };
    handleSubmit = event => {
        event.preventDefault();
        const { username, password } = this.state;
        axios({
            url: "/authenticate/signup",
            method: "POST",
            data: {
                username,
                password
            }
        })
            .then(response => {
                this.props.history.push("/profile");
            })
            .catch(error => {
                this.setState({
                    errorMessage: error.response.data.message
                });
            });
    };
    handleChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };
    render() {

        //JSX
        return (
            <div>
                <h2>Signup Component</h2>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="username" onChange={this.handleChange} />
                    <input type="password" name="password" onChange={this.handleChange} />

                    <button>Signup</button>
                </form>
            </div>
        );
    }

}