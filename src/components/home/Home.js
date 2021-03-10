import React from 'react';
import { Link } from 'react-router-dom';
import './Home.scss';

export default function Home(props) {
    return (
        <section className='home-section'>
            <img src='https://res.cloudinary.com/da6m0xppc/image/upload/v1615122830/brainstorming_ncddel.svg' alt='Skill swap home page' />
            <h1>Swap skills </h1>
            <p>Revolutionary way to learn something new</p>
            <div className='home-links'>
                <Link to='/skills'>Browse skills</Link>
                {!props.userInSession && <Link to='/login'>Login</Link>}
            </div>
            <div className='row'>
                <div className='column'>
                    <img src='https://via.placeholder.com/150'/>
                    <p>Lorem Ipsum</p>
                </div>
                <div className='column'>
                    <img src='https://via.placeholder.com/150'/>
                    <p>Lorem Ipsum</p>
                </div>
                <div className='column'>
                    <img src='https://via.placeholder.com/150'/>
                    <p>Lorem Ipsum</p>
                </div>
            </div>
        </section>
    )
}
