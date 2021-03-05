import axios from 'axios';
import React, { Component } from 'react';
import EditSkill from './EditSkill';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import AddReview from '../reviews/AddReview';
import ReviewList from '../reviews/ReviewList';

export default class SingleSkill extends Component {

    constructor(props) {
        super(props);
        this.state = {
            displayContactDetails: false,
            contact: '',
            displayAllReviews: false,
            average: 0,
            reviews: []
        }
    }

    getSingleSkill() {
        axios.get(`http://localhost:5000/api/skills/${this.props.match.params.skillId}`, {withCredentials: true})
            .then(response => {
                const fetchedSkill = response.data;
                this.setState(fetchedSkill);
                this.countAvg();
            });
    } 

    getUpdatedSkill(response) {
        axios.get(`http://localhost:5000/api/skills/${response.data._id}`, {withCredentials: true})
            .then(response => {
                const fetchedSkill = response.data;
                this.setState(fetchedSkill);
                this.countAvg();
            });
    } 

    componentDidMount() {
        this.getSingleSkill();
    }

    displayContactInfo = () => {
        const skillId = this.state._id;
        const userId = this.state.user;
        axios.get(`http://localhost:5000/api/skills/${skillId}/${userId}`, {withCredentials: true})
            .then(response => {
                this.setState({
                    displayContactDetails: !this.state.displayContactDetails,
                    contact: response.data
                });
            })
            .catch(error => console.log(error));
    }

    displayReviewList = () => {
        this.setState({displayAllReviews: !this.state.displayAllReviews})
    }

    displayAvg(response) {
        this.setState({average: response})
    }

    getAllReviews = () => {
        const skill = this.state._id;
        axios.get(`http://localhost:5000/api/${skill}/reviews`)
            .then(response => {
                this.setState({reviews: response.data});
            });
    }

    countAvg = () => {
        this.getAllReviews();
        const ratings = this.state.reviews.map(review => {
            return review.rating;
        });
        const ratingsAvg = +(ratings.reduce((a,b) => a + b, 0) / ratings.length).toFixed(2);
        this.setState({average: ratingsAvg});
    }

    render() {
        return (
            <div>
                <h2>Title: {this.state.title}</h2>
                <h4>Description: {this.state.description}</h4>
                <p>Average review for this skill: {this.state.average}</p>
                {this.props.userInSession && this.props.userInSession._id == this.state.user &&
                    <Popup trigger={<button> Edit my skill </button>} modal>
                        <EditSkill currentSkill={this.state} refreshSkill={(response) => this.getUpdatedSkill(response)} />
                    </Popup>
                }

                {this.props.userInSession && this.props.userInSession._id !== this.state.user &&
                <React.Fragment>
                    <button onClick={this.displayContactInfo}>Swap</button>
                </React.Fragment>
                }
                {this.state.displayContactDetails &&
                <React.Fragment>
                    <p>{this.state.contact.username}</p>
                    <p>{this.state.contact.email}</p>
                    <p>{this.state.contact.description}</p>
                </React.Fragment>
                }
                <button onClick={this.displayReviewList}>See all reviews</button>
                {this.state.displayAllReviews &&
                <React.Fragment>
                    <AddReview skill={this.state._id} updateSkill={response => {this.getUpdatedSkill(response)}}/>
                    <ReviewList allReviews={this.state.reviews} skill={this.state._id} />
                </React.Fragment>
                }
            </div>
        )
    }
}
