import React, { Component } from 'react'

export default class ReviewList extends Component {
    render() {
        return (
            <div>
                {this.props.allReviews.map(review => {
                    return(
                        <p>{review.comment} | {review.rating}</p>
                    )
                })}
            </div>
        )
    }
}
