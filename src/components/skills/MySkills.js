import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AddSkill from './AddSkill';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './MySkills.scss';

export default class MySkills extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mySkills: []
        }
    }

    getMySkills() {
        axios.get('http://localhost:5000/api/my-skills', {withCredentials: true})
            .then(response => {
                this.setState({
                    mySkills: response.data
                });
            })
            .catch(error => console.log(error))
    }

    componentDidMount() {
        this.getMySkills();
    }

    handleDelete(skillId) {
        axios.delete(`http://localhost:5000/api/skills/${skillId}`)
            .then(() => {
                this.getMySkills();
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <main className='my-skills'>
                <div>
                    <Link to='/skills'>Browse skills</Link>
                    <Popup trigger={<button> Add new skill </button>} modal>
                        <AddSkill getAllMySkills={() => this.getMySkills()} />
                    </Popup>
                </div>
                <ul>
                {this.state.mySkills.map(skill => {
                    return(
                        <section className='my-skill-card'>
                            <div key={skill._id}>
                                <h3><Link to={`/skills/${skill._id}`}>{skill.title}</Link></h3>
                                <img src='https://res.cloudinary.com/da6m0xppc/image/upload/v1615318971/bin_ndnbz3.svg' alt='Delete skill icon' onClick={(skillId)=> this.handleDelete(skill._id)} />
                                {/* <button onClick={(skillId)=> this.handleDelete(skill._id)}>Delete</button> */}
                            </div>
                            <p>{skill.description}</p>
                        </section>
                    )
                })}
                </ul>
            </main>
        )
    }
}