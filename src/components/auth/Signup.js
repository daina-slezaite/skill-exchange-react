import React, { Component } from 'react';
import AuthService from '../services/AuthService';

export default class Signup extends Component {

    state = {
        email: '',
        username: '',
        password: ''
    }

    service = new AuthService();

    handleInputChange = e => {
        const {name, value} = e.target;
        this.setState({
            [name]: value
        })
    }

    handleFormSubmit = e => {
        e.preventDefault();
        const {email, username, password} = this.state;
        this.service.signup(email, username, password)
            .then(response => {
                this.setState({
                    email: '',
                    username: '',
                    password: ''
                });
                this.props.setUser(response);
                this.props.history.push('/skills');
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        return (
            <form onSubmit={this.handleFormSubmit}>
                <label>Email:</label>
                <input type='text' name='email' value={this.state.email} onChange={this.handleInputChange} />
                <label>Username:</label>
                <input type='text' name='username' value={this.state.username} onChange={this.handleInputChange} />
                <label>Password:</label>
                <input type='password' name='password' value={this.state.password} onChange={this.handleInputChange} />
                <button type='submit'>Create account</button>
            </form>
        )
    }
}
