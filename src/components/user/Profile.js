import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Profile extends Component {

   state = {loggedInUser: this.props.userInSession}

    componentDidUpdate(prevProps) {
        if(this.props.userInSession !== prevProps.userInSession) {
            this.setState({loggedInUser: this.props.userInSession})
        }
    }

    render() {
        return (
            <div>
                <p>Username: {this.state.loggedInUser.username}</p>
                <p>Email: {this.state.loggedInUser.email}</p>
                <Link to='/my-skills'>My skills</Link>
                {/* <h3>My favorite skills:</h3>
                <ul>
                    {this.state.loggedInUser.favoriteSkills.map(favSkill => {
                        return(
                            <li key={favSkill._id}>
                                <h4>{favSkill.title}</h4>
                                <p>{favSkill.category}</p>
                            </li>
                        )
                    })}
                </ul> */}
            </div>
        )
    }
}
