import React, { Component } from 'react';
import AuthService from '../services/AuthService';
import {Link} from 'react-router-dom';
import './styling.scss';

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
                this.props.removeSession();
            })
            .catch(error => console.log(error))
    }

    render() {
        return (
            <nav className='navbar'>
                <img src='https://res.cloudinary.com/da6m0xppc/image/upload/v1615121354/skill-swap_yik8gn.svg' alt='Logo' />
                <div className='navbar-links'>
                {this.state.loggedInUser ? 
                    <ul>
                        <li><Link to='/my-skills'>My skills</Link></li>
                        <li><Link to='/profile'>My profile</Link></li>
                        <li><Link to='/'><button onClick={this.logoutUser}>Logout</button></Link></li>
                    </ul>
                    :
                    <ul> 
                        <li><Link to='/signup'>Signup</Link></li>
                        <li><Link to='/login'>Login</Link></li>
                    </ul>
                }
                </div>
            </nav>
        )
    }
}
