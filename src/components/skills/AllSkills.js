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
        // const {name, value} = e.target;
        // this.setState({[name]: value})
        this.setState({title: e.target.value})
        this.searchBar(e);
    }

    searchBar = (e) => {
        axios.get(`http://localhost:5000/api/skills/search?title=${e.target.value}`)
            .then(response => {
                this.setState({allSkills: response.data})
            })
    }


    // handleSelectChange = e => {
    //     console.log(e.target.value)
    //     this.setState({category: e.target.value})
    //     axios.get(`http://localhost:5000/api/skills/search?category=${e.target.value}`)
    //         .then(response => {
    //             console.log(response.data);
    //             this.setState({allSkills: response.data})
    //         })
    // }

    render() {
        return (
            <div>
                <label>Search skills:</label>
                <input type='text' name='title' value={this.state.title} onChange={this.handleInputChange} />
                {/* <form>

                </form>
                <label>Filter by category:</label>
                <select name='category' value={this.state.category} onChange={this.handleInputChange}>
                    <option value="" defaultValue>Select your option</option>
                    <option value='Graphic Design'>Graphic Design</option>
                    <option value='Languages'>Languages</option>
                    <option value='Music'>Music</option>
                    <option value='Illustration'>Illustration</option>
                    <option value='Lifestyle'>Lifestyle</option>
                    <option value='Photography & Video'>Photography & Video</option>
                    <option value='Business'>Business</option>
                    <option value='Writing'>Writing</option>
                    <option value='Fine Art'>Fine Art</option>
                </select> */}
                <ul>
                {this.state.allSkills.map(skill => {
                    return(
                        <React.Fragment>
                        <li key={skill._id}><Link to={`/skills/${skill._id}`}>{skill.title}</Link></li>
                        {this.props.userInSession &&
                        <button
                        style={this.state.favSkills.includes(skill._id) ? {backgroundColor: 'red'} : {backgroundColor: 'white'}}
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
