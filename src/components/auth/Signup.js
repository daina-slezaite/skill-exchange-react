import React, { Component } from 'react';
import AuthService from '../services/AuthService';

export default class Signup extends Component {

    state = {
        email: '',
        username: '',
        password: '',
        description: ''
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
        const {email, username, password, description} = this.state;
        this.service.signup(email, username, password, description)
            .then(response => {
                this.setState({
                    email: '',
                    username: '',
                    password: '',
                    description: ''
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
                <label>About me:</label>
                <textarea name='description' value={this.state.description} onChange={this.handleInputChange}></textarea>
                <button type='submit'>Create account</button>
            </form>
        )
    }
}
