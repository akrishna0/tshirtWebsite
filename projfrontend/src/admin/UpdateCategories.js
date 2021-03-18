import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { updateaCategory, getaCategory } from "./helper/adminapicall";

const UpdateCategory = ({ match }) => {
  const [name, setName] = useState();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const { user, token } = isAuthenticated();

  const goBack = () => (
    <div className="mt-4">
      <Link to="/admin/dashboard" className="btn btn-sm btn-success mb-3">
        Admin Home
      </Link>
    </div>
  );
  const preload = (categoryId) => {
    getaCategory(categoryId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setName(data.name);
      }
    });
  };
  useEffect(() => {
    preload(match.params.categoryId);
  }, []);
  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    // backend request
    updateaCategory(user._id, token, { name }).then((data) => {
      if (data.errors) {
        console.log("THIS IS THE ERR", data.errors);
        setError(data.error);
      } else {
        setError("");
        setSuccess(true);
        setName("");
      }
    });
  };
  const successMessage = () => {
    if (success) {
      return <h4 className="text-success"> Category Updated Successfully</h4>;
    }
  };
  const errorMessage = () => {
    if (error) {
      return <h4 className="text-danger"> There was an error</h4>;
    }
  };
  const myCategoryForm = () => (
    <form>
      <div className="form-group">
        <p className="lead">Update the Category: </p>
        <input
          type="text"
          className="form-control my-3"
          onChange={handleChange}
          value={name}
          autoFocus
          required
          placeholder="For Example Summer"
        />
        <button onClick={onSubmit} className="btn btn-outline-info">
          Update Category
        </button>
      </div>
    </form>
  );

  return (
    <Base
      title="Update Category here"
      description="Update the category of products"
      className="container bg-info p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {errorMessage()}
          {myCategoryForm()}
          {goBack()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateCategory;
