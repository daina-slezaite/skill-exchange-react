import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import EditProfile from './EditProfile';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export default class Profile extends Component {

    state = {}

    getUser() {
        axios.get('http://localhost:5000/api/my-profile', {withCredentials: true})
            .then(response => {
                this.setState(response.data);
            });
    }

    componentDidMount() {
        this.getUser()
    }

    getUpdatedProfile = () => {
        axios.get(`http://localhost:5000/api/my-profile`, {withCredentials: true})
            .then(response => {
                const fetchedProfile = response.data;
                this.setState(fetchedProfile);
            });
    }

    render() {
        return (
            <div>
                <p>Username: {this.state.username}</p>
                <p>Email: {this.state.email}</p>
                <p>{this.state.description}</p>
                <Popup trigger={<button> Edit my description </button>} modal>
                    <EditProfile myProfile={this.state} refreshProfile={this.getUpdatedProfile} />
                </Popup>
                <Link to='/my-skills'>My skills</Link>
            </div>
        )
    }
}
