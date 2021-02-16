import React, { Component } from 'react';

export default class Login extends Component {

    state = {
        username: '',
        password: ''
    }

    handleInputChange = e => {
        const {name, value} = e.target;
        this.setState({
            [name]: value
        })
    }

    render() {
        return (
            <form>
                <label>Username:</label>
                <input type='text' name='username' value={this.state.username} onChange={this.handleInputChange} />
                <label>Password:</label>
                <input type='password' name='email' value={this.state.password} onChange={this.handleInputChange} />
            </form>
        )
    }
}
