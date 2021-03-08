import React from 'react'
import { Link } from 'react-router-dom';
import './Footer.scss';

export default function Footer() {
    return (
        <footer className='footer'><p>Built by <Link to='https://github.com/daina-slezaite' target="_blank">Daina Slezaite</Link> | 2021</p></footer>
    )
}
