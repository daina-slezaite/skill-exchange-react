import axios from 'axios';
import React, { Component } from 'react';
import '../skills/Addskill.scss';

export default class EditProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            description: this.props.myProfile.description
        }
    }

    handleInputChange = e => {
        this.setState({
            description: e.target.value
        })
    }

    handleFormSubmit = e => {
        e.preventDefault();
        const description = this.state.description;
        axios.put(`${process.env.REACT_APP_API_URL}/edit-profile`, {description}, {withCredentials: true})            
            .then(() => {
                this.setState({description: ''});
                this.props.refreshProfile();
            })
            .catch(error => console.log(error));
    }

    render() {
        return (
            <div>
                <form className='add-skill' onSubmit={this.handleFormSubmit}>
                    <label>Update your description:</label>
                    <textarea style={{paddingBottom: '50px'}} name='description' value={this.state.description} onChange={this.handleInputChange}></textarea>
                    <button type='submit'>Save my changes</button> 
                </form>
            </div>
        )
    }
}
