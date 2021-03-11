import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import EditProfile from './EditProfile';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './Profile.scss';

export default class Profile extends Component {

    state = {}

    getUser() {
        axios.get(`${process.env.REACT_APP_API_URL}/my-profile`, {withCredentials: true})
            .then(response => {
                this.setState(response.data);
            })
            .catch(error => console.log(error))
    }

    componentDidMount() {
        this.getUser()
    }

    getUpdatedProfile = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/my-profile`, {withCredentials: true})
            .then(response => {
                const fetchedProfile = response.data;
                this.setState(fetchedProfile);
            })
            .catch(error => console.log(error))
    }

    render() {
        return (
            <section className='profile-card'>
                <div className='profile-links'>
                    <Link to='/my-skills'>My skills</Link>
                    <Popup trigger={<button> Edit my description </button>} modal>
                            <EditProfile myProfile={this.state} refreshProfile={this.getUpdatedProfile} />
                    </Popup>
                </div>
                <div>
                    <p>Username: {this.state.username}</p>
                    <p>Email: {this.state.email}</p>
                    <p>{this.state.description}</p>
                </div>
            </section>
        )
    }
}
