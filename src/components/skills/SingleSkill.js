import axios from 'axios';
import React, { Component } from 'react';
import EditSkill from './EditSkill';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export default class SingleSkill extends Component {

    constructor(props) {
        super(props);
        this.state = {displayContactDetails: false}
    }

    getSingleSkill() {
        axios.get(`http://localhost:5000/api/skills/${this.props.match.params.skillId}`, {withCredentials: true})
            .then(response => {
                const fetchedSkill = response.data;
                this.setState(fetchedSkill);
            });
    } 

    getUpdatedSkill(response) {
        axios.get(`http://localhost:5000/api/skills/${response.data._id}`, {withCredentials: true})
            .then(response => {
                const fetchedSkill = response.data;
                this.setState(fetchedSkill);
            });
    } 

    componentDidMount() {
        this.getSingleSkill();
    }

    displayContactInfo = () => {
        this.setState({displayContactDetails: !this.state.displayContactDetails})
    }

    render() {
        return (
            <div>
                <h2>Title: {this.state.title}</h2>
                <h4>Description: {this.state.description}</h4>
                {this.props.userInSession && this.props.userInSession._id == this.state.user &&
                    <Popup trigger={<button> Edit my skill </button>} modal>
                        <EditSkill currentSkill={this.state} refreshSkill={(response) => this.getUpdatedSkill(response)} />
                    </Popup>
                }

                {this.props.userInSession && this.props.userInSession._id !== this.state.user &&
                
                <button onClick={this.displayContactInfo}>Swap</button>
                }
                {this.state.displayContactDetails && <p>{this.state.user}</p>}
            </div>
        )
    }
}
