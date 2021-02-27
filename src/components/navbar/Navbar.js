import React, { Component } from 'react';
import AuthService from '../services/AuthService';
import {Link} from 'react-router-dom';

export default class Navbar extends Component {

    state = {loggedInUser: null}

    service = new AuthService();

    componentDidUpdate(prevProps) {
        if(this.props.userInSession !== prevProps.userInSession) {
            this.setState({loggedInUser: this.props.userInSession})
        }
    }

    logoutUser = () => {
        this.service.logout()
            .then(() => {
                this.setState({loggedInUser: null});
                // this.props.setUser(null);
                this.props.removeSession();
            })
    }

    render() {
        return (
            <nav>
                {this.state.loggedInUser ? 
                    <ul style={{listStyle: 'none', display: 'flex'}}> 
                        <li><Link to='/skills'>Browse skills</Link></li>
                        <li>
                            <Link to='/'>
                                <button onClick={this.logoutUser}>Logout</button>
                            </Link>
                        </li>
                        <li><Link to='/my-skills'>My skills</Link></li>
                        <li><Link to='/profile'>My profile</Link></li>
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
