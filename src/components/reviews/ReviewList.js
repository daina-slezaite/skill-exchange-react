import axios from 'axios';
import React, { Component } from 'react'

export default class ReviewList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            reviews: []
        }
    }

    getAllReviews() {
        const skill = this.props.skill;
        axios.get(`http://localhost:5000/api/${skill}/reviews`)
            .then(response => {
                this.setState({reviews: response.data});
            });
    }

    componentDidMount() {
        this.getAllReviews();
    }

    render() {
        return (
            <div>
                {this.state.reviews.map(review => {
                    return(
                        <div key={review._id}>
                            <p>{review.comment}</p>
                            <p>{review.rating}</p>
                        </div>
                    )
                })}
            </div>
        )
    }
}
