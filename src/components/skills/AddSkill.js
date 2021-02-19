import axios from 'axios';
import React, { Component } from 'react'

export default class AddSkill extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            category: ''
        }
    }

    handleInputChange = e => {
        const {name, value} = e.target;
        this.setState({
            [name]: value
        })
    }

    handleFormSubmit = e => {
        e.preventDefault();
        const title = this.state.title;
        const description = this.state.description;
        const category = this.state.category;
        axios.post('http://localhost:5000/api/skills', {title, description, category}, {withCredentials: true})
            .then(() => {
                this.props.getAllProjects();
                this.setState({
                    title: '',
                    description: '',
                    category: ''
                })
            })
    }

    render() {
        return (
            <form onSubmit={this.handleFormSubmit}>
                <label>Give a name to your skill:</label>
                <input type='text' name='title' value={this.state.title} onChange={this.handleInputChange} />

                <label>Choose a category:
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
                    </select>
                </label>

                <label>Describe your skill in one sentence:</label>
                <input type='text' name='description' value={this.state.description} onChange={this.handleInputChange} />

                <button type='submit'>Publish my skill</button>
            </form>
        )
    }
}
