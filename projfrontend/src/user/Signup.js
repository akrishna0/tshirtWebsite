import React from 'react'
import Base from '../core/Base'
import {Link} from 'react-router-dom'
const Signup = ()=> {

    const signupForm = () =>{
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Name</label>
                            <input type="text" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input type="Email" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input type="password" className="form-control"/>
                        </div>
                        <button type="submit" className="btn btn-success btn-block">Sign Up</button>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <Base title="Sign Up Page" description="This is a signup page">
            {signupForm()}
        </Base>
    )
}

export default Signup
