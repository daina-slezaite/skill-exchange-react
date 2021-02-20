import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AddSkill from './AddSkill';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export default class MySkills extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mySkills: []
        }
    }

    getMySkills() {
        axios.get('http://localhost:5000/api/my-skills', {withCredentials: true})
            .then(response => {
                this.setState({
                    mySkills: response.data
                });
            });
    }

    componentDidMount() {
        this.getMySkills();
    }

    render() {
        return (
            <div>
                <ul>
                {this.state.mySkills.map(skill => {
                    return(
                        <li key={skill._id}><Link to={`/skills/${skill._id}`}>{skill.title}</Link></li>
                    )
                })}
                </ul>
                <Popup trigger={<button> Add new skill </button>} modal>
                    <AddSkill getAllMySkills={() => this.getMySkills()} />
                </Popup>
            </div>
        )
    }
}