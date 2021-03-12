import axios from 'axios';
import React, { Component } from 'react';
import './Addskill.scss';

export default class EditSkill extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: this.props.currentSkill.title,
            category: this.props.currentSkill.category,
            description: this.props.currentSkill.description
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
        axios.put(`${process.env.REACT_APP_API_URL}/skills/${this.props.currentSkill._id}`, {title, description, category}, {withCredentials: true})
            .then(response => {
                this.props.refreshSkill(response);
            })
            .catch(error => console.log(error));
    }

    render() {
        return (
            <div>
                <form className='add-skill' onSubmit={this.handleFormSubmit}>
                    <label>Rename your skill:</label>
                    <input type='text' name='title' value={this.state.title} onChange={this.handleInputChange} />

                    <label>Change category:
                        <select name='category' value={this.state.category} onChange={this.handleInputChange}>
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

                    <button type='submit'>Publish my changes</button> 
                </form>
            </div>
        )
    }
}
