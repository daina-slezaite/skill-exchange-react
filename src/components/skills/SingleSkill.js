import axios from 'axios';
import React, { Component } from 'react';

export default class SingleSkill extends Component {

    state = {}

    getSingleSkill() {
        axios.get(`http://localhost:5000/api/skills/${this.props.match.params.skillId}`, {withCredentials: true})
            .then(response => {
                const fetchedSkill = response.data;
                this.setState(fetchedSkill);
            });
    } 

    componentDidMount() {
        this.getSingleSkill();
    }

    render() {
        return (
            <div>
                <h2>Title: {this.state.title}</h2>
                <h4>Description: {this.state.description}</h4>
            </div>
        )
    }
}
