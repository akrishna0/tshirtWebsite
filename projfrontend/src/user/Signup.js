import { React, useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper/index";
const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, password, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password })
      .then((data) => {
        if (data.errors) {
          setValues({ ...values, error: data.errors, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
      })
      .catch(console.log("ERROR IN SIGNUP"));
  };

  const signupForm = () => {
    return (
      <div className="row">
        <div className="col-md-4 offset-sm-4 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Name</label>
              <input
                type="text"
                value={name}
                onChange={handleChange("name")}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                type="Email"
                value={email}
                onChange={handleChange("email")}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                type="password"
                value={password}
                onChange={handleChange("password")}
                className="form-control"
              />
            </div>
            <button
              onClick={onSubmit}
              type="submit"
              className="btn btn-success btn-block"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    );
  };
  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-4 offset-sm-4 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New Account created successfully!
            <Link to="/signin">Login here</Link>
          </div>
        </div>
      </div>
    );
  };
  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-4 offset-sm-4 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };
  return (
    <Base title="Sign Up Page" description="This is a signup page">
      {errorMessage()}
      {successMessage()}
      {signupForm()}
      <p className="text-white text-center"> {JSON.stringify(values)}</p>
    </Base>
  );
};

export default Signup;
