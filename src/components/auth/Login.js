import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../services/AuthService';
import './styling.scss';

export default class Login extends Component {

    state = {
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
        const {username, password} = this.state;
        this.service.login(username, password)
            .then(response => {
                this.setState({
                    username: '',
                    password: ''
                });
                this.props.setUser(response);
                this.props.history.push('/skills')
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleFormSubmit}>
                    <label>Username:</label>
                    <input type='text' name='username' value={this.state.username} onChange={this.handleInputChange} />
                    <label>Password:</label>
                    <input type='password' name='password' value={this.state.password} onChange={this.handleInputChange} />
                    <button type='submit'>Login</button>
                </form>
                <p>Don't have an account yet? <Link to='/signup'>Register here</Link></p>
            </div>
        )
    }
}
