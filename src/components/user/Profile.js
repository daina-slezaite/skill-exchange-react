import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Profile extends Component {

    render() {
        return (
            <div>
                <p>Username: {this.props.userInSession.username}</p>
                <p>Email: {this.props.userInSession.email}</p>
                <Link to='/my-skills'>My skills</Link>
                <h3>My favorite skills:</h3>
                <ul>
                    {this.props.userInSession.favoriteSkills.map(favSkill => {
                        return(
                            <li key={favSkill._id}>
                                <h4>{favSkill.title}</h4>
                                <p>{favSkill.category}</p>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}
