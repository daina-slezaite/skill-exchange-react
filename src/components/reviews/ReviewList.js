import React, { Component } from 'react'

export default class ReviewList extends Component {
    render() {
        return (
            <div>
                {this.props.allReviews.map(review => {
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
