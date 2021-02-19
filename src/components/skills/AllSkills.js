import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AddSkill from './AddSkill';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export default class AllSkills extends Component {

    state = {
        allSkills: []
    }

    getAllSkills() {
        axios.get('http://localhost:5000/api/skills', {withCredentials: true})
            .then(response => {
                this.setState({
                    allSkills: response.data
                });
            });
    }

    componentDidMount() {
        this.getAllSkills();
    }

    render() {
        return (
            <div>
                <ul>
                {this.state.allSkills.map(skill => {
                    return(
                        <li key={skill._id}><Link to={`/skills/${skill._id}`}>{skill.title}</Link></li>
                    )
                })}
                </ul>
                <Popup trigger={<button> Add new skill </button>} modal>
                    <AddSkill getAllProjects={() => this.getAllSkills()} />
                </Popup>
            </div>
        )
    }
}
