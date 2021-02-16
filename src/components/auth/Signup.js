import React, { Component } from 'react';

export default class Signup extends Component {

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
                <label>Email:</label>
                <input type='text' name='email' value={this.state.email} onChange={this.handleInputChange} />
                <label>Username:</label>
                <input type='text' name='username' value={this.state.username} onChange={this.handleInputChange} />
                <label>Password:</label>
                <input type='password' name='email' value={this.state.password} onChange={this.handleInputChange} />
            </form>
        )
    }
}
