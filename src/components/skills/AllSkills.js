import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'reactjs-popup/dist/index.css';

export default class AllSkills extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allSkills: []
        }
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

    addToFavorites(singleSkill) {
        const favoriteSkill = singleSkill;
        axios.post(`http://localhost:5000/api/skills/${singleSkill._id}/to-favorites`, {favoriteSkill}, {withCredentials: true})
            .then(response => {
               console.log(response);
            })
            .catch(error => console.log(error));
    }

    render() {
        return (
            <div>
                <ul>
                {this.state.allSkills.map(skill => {
                    return(
                        <React.Fragment>
                        <li key={skill._id}><Link to={`/skills/${skill._id}`}>{skill.title}</Link></li>
                        {this.props.userInSession &&
                        <button
                        style={this.props.userInSession.favoriteSkills.includes(skill._id) ? {backgroundColor: 'red'} : {backgroundColor: 'white'}}
                        onClick={(singleSkill) => this.addToFavorites(skill)} >
                        ❤
                        </button>}
                        </React.Fragment>
                    )
                })}
                </ul>
            </div>
        )
    }
}
