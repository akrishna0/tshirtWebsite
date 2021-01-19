import {React, useState} from 'react'
import Base from '../core/Base'
import {Link} from 'react-router-dom'
import{signup} from '../auth/helper/index'
const Signup = ()=> {

    const [values,setValues] = useState({
        name:"",
        email: "",
        password: "",
        error: "",
        success: false,
    });
    
    const {name,email,password,error,success} = values;

    const handleChange = name => event =>{
        setValues({...values, error: false, [name]: event.target.value});
    }

    const onSubmit = event =>{
        event.preventDefault()
        setValues({...values, error: false})
        signup({name,email,password})
        .then(data =>{
            if(data.error){
                setValues({...values, error:data.error, success:false})
            }else{
                setValues({
                    ...values,
                    name : "",
                    email : "",
                    password : "",
                    error :"",
                    success:true
                })
            }
        })
        .catch(error =>console.log(error));
    }

    const signupForm = () =>{
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Name</label>
                            <input type="text" onChange={handleChange("name")} className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input type="Email" onChange={handleChange("email")} className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input type="password" onChange={handleChange("password")} className="form-control"/>
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
