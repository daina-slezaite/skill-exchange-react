import React, { Component } from 'react';
import AuthService from '../services/AuthService';
import {Link} from 'react-router-dom';

export default class Navbar extends Component {

    state = {loggedInUser: null}

    service = new AuthService();

    componentWillReceiveProps(nextProps) {
        this.setState({...this.state, loggedInUser: nextProps['userInSession']});
    }

    logoutUser = () => {
        this.service.logout()
            .then(() => {
                this.setState({loggedInUser: null});
            })
    }

    render() {
        return (
            <nav>
                {this.state.loggedInUser ? 
                    <ul style={{listStyle: 'none', display: 'flex'}}> 
                        <li><Link to='/skills'>Browse skills</Link></li>
                        <li>
                            <Link to='/logout'>
                                <button onClick={this.logoutUser}>Logout</button>
                            </Link>
                        </li>
                        <li><Link to='/my-skills'>My skills</Link></li>
                    </ul>
                    :
                    <ul style={{listStyle: 'none', display: 'flex'}}> 
                        <li><Link to='/signup'>Signup</Link></li>
                        <li><Link to='/login'>Login</Link></li>
                        <li><Link to='/skills'>Browse skills</Link></li>
                    </ul>
                }
            </nav>
        )
    }
}
