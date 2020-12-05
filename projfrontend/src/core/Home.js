import React from 'react'
import '../styles.css'
import {API} from '../backend'
function Home() {
    console.log("API IS THIS", API);
    return (
        <div>
            <h1 className="text-white">Home</h1>
        </div>
    )
}

export default Home;
