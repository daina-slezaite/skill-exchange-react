import React, { Component } from 'react'
import Rating from './Rating';
import './ReviewList.scss';

export default class ReviewList extends Component {
    render() {
        return (
            <div>
                {this.props.allReviews.map(review => {
                    return(
                        <div className='single-review'>
                            <Rating>{review.rating}</Rating>
                            <p>{review.comment}</p>
                        </div>
                    )
                })}
            </div>
        )
    }
}
