import React, { useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";

const AddCategory = () => {
  const [name, setName] = useState();
  const [error, setError] = useState(false);
  const [sucess, setSucess] = useState(false);
  const { user, token } = isAuthenticated();

  const goBack = () => (
    <div className="mt-4">
      <Link to="/admin/dashboard" className="btn btn-sm btn-success mb-3">
        Admin Home
      </Link>
    </div>
  );
  const myCategoryForm = () => (
    <form>
      <div className="form-group">
        <p className="lead">Enter the Category: </p>
        <input
          type="text"
          className="form-control my-3"
          autoFocus
          required
          placeholder="For Example Summer"
        />
        <button className="btn btn-outline-info">Create Category</button>
      </div>
    </form>
  );

  return (
    <Base
      title="Create a Category here"
      description="Add a new category of products"
      className="container bg-info p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {myCategoryForm()}
          {goBack()}
        </div>
      </div>
    </Base>
  );
};

export default AddCategory;
