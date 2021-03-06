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
            })
            .catch(error => console.log(error))
    }

    componentDidMount() {
        this.getMySkills();
    }

    handleDelete(skillId) {
        axios.delete(`http://localhost:5000/api/skills/${skillId}`)
            .then(() => {
                this.getMySkills();
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                <ul>
                {this.state.mySkills.map(skill => {
                    return(
                        <React.Fragment key={skill._id}>
                        <li><Link to={`/skills/${skill._id}`}>{skill.title}</Link></li>
                        <button onClick={(skillId)=> this.handleDelete(skill._id)}>Delete</button>
                        </React.Fragment>
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