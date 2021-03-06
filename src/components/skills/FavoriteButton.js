import React, { Component } from 'react';

export default class FavoriteButton extends Component {
    render() {
        return (
            <img style={{'width': '30px'}} src={this.props.icon} alt='Heart' onClick={this.props.click} />
        )
    }
}
