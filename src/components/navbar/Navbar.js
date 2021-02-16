import React, { Component } from 'react';
import AuthService from '../services/AuthService';

export default class Navbar extends Component {

    service = new AuthService();

    render() {
        return (
            <nav>
                <ul style={{listStyle: 'none', display: 'flex'}}>
                    <li>Skills</li>
                    <li>Signup</li>
                    <li>Login</li>
                    <li>Logout</li>
                </ul>
            </nav>
        )
    }
}
