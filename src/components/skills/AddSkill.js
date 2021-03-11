import axios from 'axios';
import React, { Component } from 'react';
import UploadService from '../services/UploadService';
import './Addskill.scss';

export default class AddSkill extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            category: '',
            imageUrl: ''
        }
    }

    service = new UploadService();

    handleInputChange = e => {
        const {name, value} = e.target;
        this.setState({
            [name]: value
        })
    }

    handleFormSubmit = e => {
        e.preventDefault();
        const image = this.state.imageUrl;
        const title = this.state.title;
        const description = this.state.description;
        const category = this.state.category;
        axios.post('https://skillsw4p.herokuapp.com/skills', {title, description, category, image}, {withCredentials: true})
            .then(() => {
                this.props.getAllMySkills();
                this.setState({
                    title: '',
                    description: '',
                    category: '',
                    imageUrl: ''
                })
            })
            .catch(error => {
                console.log(error);
            })
    }

    handleFileUpload = e => {
        const uploadData = new FormData();
        uploadData.append('imageUrl', e.target.files[0]);

        this.service.handleUpload(uploadData)
            .then(response => {
                this.setState({imageUrl: response.secure_url})
            })
            .catch(error => console.log(error));
    }

    render() {
        return (
                <form className='add-skill' onSubmit={this.handleFormSubmit}>
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

                    <label>Upload an image:</label>
                    <input type='file' onChange={this.handleFileUpload} />

                    <button type='submit'>Publish my skill</button>
                </form>
        )
    }
}
