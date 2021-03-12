import React from 'react';
import { Link } from 'react-router-dom';
import './Home.scss';

export default function Home(props) {
    return (
        <section className='home-section'>
            <img src='https://res.cloudinary.com/da6m0xppc/image/upload/v1615122830/brainstorming_ncddel.svg' alt='Skill swap home page' />
            <h1>Swap skills for skills and upgrade yourself</h1>
            <p>Community-based platform to exchange what you know for something new</p>
            <div className='home-links'>
                <Link to='/skills'>Browse skills</Link>
                {!props.userInSession && <Link to='/login'>Login</Link>}
            </div>
            <div className='row'>
            <h2>How does it work?</h2>
                <div className='column'>
                    <img style={{height: '250px'}} src='https://res.cloudinary.com/da6m0xppc/image/upload/v1615581722/vision_nvatmy.png'/>
                    <p>Browse through community's skills</p>
                </div>
                <div className='column'>
                    <img style={{height: '250px'}} src='https://res.cloudinary.com/da6m0xppc/image/upload/v1615581805/newsletter_bej3df.png'/>
                    <p>Contact your dream skill's owner</p>
                </div>
                <div className='column'>
                    <img style={{height: '250px'}} src='https://res.cloudinary.com/da6m0xppc/image/upload/v1615581849/teaching_1_hzf57x.png'/>
                    <p>Swap your skills with each other</p>
                </div>
            </div>
        </section>
    )
}
