import React from 'react';

export default function Rating(props) {
    const ratings = {
        0: '☆☆☆☆☆',
        1: '★☆☆☆☆',
        2: '★★☆☆☆',
        3: '★★★☆☆',
        4: '★★★★☆',
        5: '★★★★★'
    }

    for (const rating in ratings) {
        if(rating == Math.round(props.children)){
            return <div style={{marginBottom: '-10px', paddingTop: '5px'}} className="rating">{ratings[rating]}</div>
        }
    }
}

