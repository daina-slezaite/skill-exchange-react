import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'reactjs-popup/dist/index.css';

export default class AllSkills extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allSkills: [],
            favSkills: this.props.userInSession ? this.props.userInSession.favoriteSkills : [],
            title: '',
            category: ''
        }
    }

    getAllSkills() {
        axios.get('http://localhost:5000/api/skills', {withCredentials: true})
            .then(response => {
                this.setState({
                    allSkills: response.data,
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
                this.setState({favSkills: response.data.favoriteSkills})
                this.getAllSkills();
            })
            .catch(error => console.log(error));
    }

    handleInputChange = e => {
        this.setState({title: e.target.value})
        this.searchBar(e);
    }

    searchBar = (e) => {
        axios.get(`http://localhost:5000/api/skills/search?title=${e.target.value}`)
            .then(response => {
                this.setState({allSkills: response.data})
            })
    }

    render() {
        return (
            <div>
                <label>Search skills:</label>
                <input type='text' name='title' value={this.state.title} onChange={this.handleInputChange} />
                <ul>
                {this.state.allSkills.map(skill => {
                    return(
                        <React.Fragment>
                        <li key={skill._id}><Link to={`/skills/${skill._id}`}>{skill.title}</Link></li>
                        {this.props.userInSession &&
                        <React.Fragment>
                        <button
                        style={this.state.favSkills.includes(skill._id) ? {backgroundColor: 'red'} : {backgroundColor: 'white'}}
                        onClick={(singleSkill) => this.addToFavorites(skill)} >
                        ❤
                        </button>
                        </React.Fragment>
                        }
                        </React.Fragment>
                    )
                })}
                </ul>
            </div>
        )
    }
}
