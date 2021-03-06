import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'reactjs-popup/dist/index.css';
import './AllSkills.scss';

export default class AllSkills extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allSkills: [],
            title: '',
            category: ''
        }
    }

    getAllSkills() {
        axios.get(`${process.env.REACT_APP_API_URL}/skills`, {withCredentials: true})
            .then(response => {
                this.setState({
                    allSkills: response.data,
                });
            })
            .catch(error => console.log(error))
    }

    componentDidMount() {
        this.getAllSkills();
    }

    handleInputChange = e => {
        this.setState({title: e.target.value})
        this.searchBar(e);
    }

    searchBar = (e) => {
        axios.get(`${process.env.REACT_APP_API_URL}/skills/search?title=${e.target.value}`)
            .then(response => {
                this.setState({allSkills: response.data})
            })
            .catch(error => console.log(error))
    }

    handleCategoryChange = e => {
        this.getAllSkills();
        this.setState({category: e.target.value});
    }

    handleCategoryFilter = e => {
        e.preventDefault();
        const filteredSkills = this.state.category === '' ? this.state.allSkills : this.state.allSkills.filter(skill => skill.category === this.state.category);
        this.setState({allSkills: filteredSkills});
    }

    render() {
        return (
            <div className='skills-list'>
                <div className='skills-list-header'>
                    <h1>Skills</h1>
                    <div className='search-form'>
                        <label>Search skills:</label>
                        <input type='text' name='title' value={this.state.title} onChange={this.handleInputChange} />
                    </div>
                </div>
                <hr />
                {/* <form className='filter-form' onSubmit={this.handleCategoryFilter}>
                    <label>Filter skills by category:</label>
                    <select name='category' value={this.state.category} onChange={this.handleCategoryChange}>
                        <option value="" defaultValue>All skills</option>
                        <option value='Graphic Design'>Graphic Design</option>
                        <option value='Languages'>Languages</option>
                        <option value='Music'>Music</option>
                        <option value='Illustration'>Illustration</option>
                        <option value='Lifestyle'>Lifestyle</option>
                        <option value='Photography & Video'>Photography & Video</option>
                        <option value='Business'>Business</option>
                        <option value='Writing'>Writing</option>
                        <option value='Fine Art'>Fine Art</option>
                    </select>
                    <button type='submit'>Filter</button>
                </form> */}
                <ul>
                {this.state.allSkills.map(skill => {
                    return(
                        <div className='skill-card' key={skill._id}>
                        <li><Link to={`/skills/${skill._id}`}>{skill.title}</Link></li>
                        <p>{skill.category}</p>
                        </div>
                    )
                })}
                </ul>
            </div>
        )
    }
}
