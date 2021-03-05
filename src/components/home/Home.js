import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div>
            <h1>This is my home page headline</h1>
            <h3>This is my home page supporting text</h3>
            <Link to='/skills'>Browse skills</Link>
            <Link to='/login'>Login</Link>
        </div>
    )
}
