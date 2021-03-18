import React, { useState } from "react";
import Base from "../core/Base";
import { Redirect } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "../auth/helper/index";
const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    role: "",
    loading: false,
    didRedirect: false,
  });
  const { email, password, role, error, loading, didRedirect } = values;
  // const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.errors) {
          setValues({ ...values, error: data.errors, loading: false });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true,
            });
          });
        }
      })
      .catch(console.log("SIGNIN FAILED"));
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  const loadingMessage = () => {
    return (
      <div className="row">
        <div className="col-md-4 offset-sm-4 text-left">
          <div
            className="alert alert-success"
            style={{ display: loading ? "" : "none" }}
          >
            <h1>Loading......</h1>
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
  const signinForm = () => {
    return (
      <div className="row">
        <div className="col-md-4 offset-sm-4 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                onChange={handleChange("email")}
                value={email}
                type="Email"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                onChange={handleChange("password")}
                value={password}
                type="password"
                className="form-control"
              />
            </div>
            <button
              onClick={onSubmit}
              type="submit"
              className="btn btn-success btn-block"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="Sign In Page" description="This is a signin page">
      {loadingMessage()}
      {errorMessage()}
      {signinForm()}
      {performRedirect()}
    </Base>
  );
};

export default Signin;
