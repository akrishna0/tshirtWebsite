import React from 'react'
import '../styles.css'
import {API} from '../backend'
import Base from './Base';

function Home() {
    console.log("API IS THIS", API);
    return (
        <Base title="Home Page" description="This is the First Page">
            <h1 className="text-white">Home is this</h1>
        </Base>
    )
}

export default Home;
