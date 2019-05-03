import React, { Component } from 'react';
import axios from 'axios';
export default class Profile extends Component {
    state = {
        name: '',
        username: '',
        occupation: '',
        price: '',
        errorMessage: ''

    };
    handleSubmit = event => {
        event.preventDefault();
        const { username, name, occupation, price } = this.state;
        axios({
            url: "/authenticate/signin",
            method: "POST",
            data: {
                username,
                name,
                occupation,
                price

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

    }
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
                <h2>Profile</h2>
                <form onSubmit={this.handleSubmit}>
                    {/* <input type="text" name="email" placeholder="Email" onChange={this.handleChange} /> */}
                    <input type="text" name="name" placeholder="Name" onChange={this.handleChange} />
                    <input type="text" name="occupation" placeholder="Occupation" onChange={this.handleChange} />
                    <input type="text" name="price" placeholder="Price" onChange={this.handleChange} />

                    <button>ADD Profile</button>
                </form>
                <p>{this.state.errorMessage}</p>
            </div >
        );
    }

}