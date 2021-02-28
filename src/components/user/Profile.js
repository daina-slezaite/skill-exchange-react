import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export default class Profile extends Component {

    state = { 
        loggedInUser: {},
        firstSkill: '',
        secondSkill: '',
        thirdSkill: ''
    }

    handleInputChange = e => {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    handleFormSubmit = e => {
        e.preventDefault();
        const firstSkill = this.state.firstSkill;
        const secondSkill = this.state.secondSkill;
        const thirdSkill = this.state.thirdSkill;
        axios.put(`http://localhost:5000/api/wantedSkills`, {firstSkill, secondSkill, thirdSkill}, {withCredentials: true})
            .then(() => {
                this.getUser();
                this.setState({
                    firstSkill: '',
                    secondSkill: '',
                    thirdSkill: ''
                });
            })
            .catch(error => console.log(error));
    }

    getUser() {
        axios.get('http://localhost:5000/api/my-profile', {withCredentials: true})
            .then(response => {
                this.setState({loggedInUser: response.data})
            });
    }

    componentDidMount() {
        this.getUser()
    }

    render() {
        return (
            <div>
                <p>Username: {this.state.loggedInUser.username}</p>
                <p>Email: {this.state.loggedInUser.email}</p>
                {this.state.loggedInUser.wantedSkills && this.state.loggedInUser.wantedSkills.length > 0 ? 
                    <React.Fragment>
                        <h4>Skills you want to learn:</h4>
                        <ul>
                            <li>{this.state.loggedInUser.wantedSkills[0].firstSkill}</li>
                            <li>{this.state.loggedInUser.wantedSkills[0].secondSkill}</li>
                            <li>{this.state.loggedInUser.wantedSkills[0].thirdSkill}</li>
                        </ul>
                        <button>Change them</button>
                    </React.Fragment>
                    :
                    <Popup trigger={<button> Your skill preferences </button>} modal>
                        <form onSubmit={this.handleFormSubmit}>
                            <input type='text' name='firstSkill' value={this.state.firstSkill} onChange={this.handleInputChange} />
                            <input type='text' name='secondSkill' value={this.state.secondSkill} onChange={this.handleInputChange} />
                            <input type='text' name='thirdSkill' value={this.state.thirdSkill} onChange={this.handleInputChange} />
                            <button type='submit'>Submit</button>
                        </form>
                    </Popup>
                }
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
