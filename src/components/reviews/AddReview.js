import axios from 'axios'
import React, { Component } from 'react'
import './AddReview.scss';

export default class AddReview extends Component {

    state = {
        comment: ''
    }

    handleRadioChange = e => {
        this.setState({rating: e.target.value})
    }

    handleInputChange = e => {
        this.setState({comment: e.target.value})
    }

    handleFormSubmit = e => {
        e.preventDefault();
        const rating = parseInt(this.state.rating);
        const {comment} = this.state;
        const skill = this.props.skill;
        axios.post(`${process.env.REACT_APP_API_URL}/${skill}/reviews`, {comment, rating, skill}, {withCredentials: true})
            .then(response => {
                this.setState({comment: '', rating: ''});
                this.props.updateSkill(response);
            })
            .catch(error => console.log(error));
    }

    render() {
        return (
            <React.Fragment>
                <h3>Add review</h3>
                <form className='add-review' onSubmit={this.handleFormSubmit}>
                    <label>Comment your experience:</label>
                    <textarea onChange={this.handleInputChange} value={this.state.comment}></textarea>
                    <label>Score it out of 5:</label>
                    <div>
                        <input type="radio" name="rating" id="str1" value="1" checked={this.state.rating === "1"} onChange={this.handleRadioChange} /><label htmlFor="str1">1</label>
                        <input type="radio" name="rating" id="str2" value="2" checked={this.state.rating === "2"} onChange={this.handleRadioChange} /><label htmlFor="str2">2</label>
                        <input type="radio" name="rating" id="str3" value="3" checked={this.state.rating === "3"} onChange={this.handleRadioChange} /><label htmlFor="str3">3</label>
                        <input type="radio" name="rating" id="str4" value="4" checked={this.state.rating === "4"} onChange={this.handleRadioChange} /><label htmlFor="str4">4</label>
                        <input type="radio" name="rating" id="str5" value="5" checked={this.state.rating === "5"} onChange={this.handleRadioChange} /><label htmlFor="str5">5</label>               
                    </div>
                    <button type='submit'>Post review</button>
                </form>
            </React.Fragment>
        )
    }
}
