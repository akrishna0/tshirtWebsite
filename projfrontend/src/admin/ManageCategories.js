import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { deleteeaCategory, getCategories } from "../admin/helper/adminapicall";
import { isAuthenticated } from "../auth/helper/index";

function ManageCategories({ match }) {
  const [categories, setCategories] = useState([]);
  const { user, token } = isAuthenticated();

  const preload = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  };
  useEffect(() => {
    preload();
  }, []);
  const deleteThisCategory = (CategoryId) => {
    deleteeaCategory(CategoryId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };

  return (
    <Base title="Manage Categories" description="Manage Categories Section">
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <h2 className="mb-4">All Categories:</h2>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">
            Total {categories.length} Categories
          </h2>
          {categories.map((cate, index) => {
            return (
              <div className="row text-center mb-2 " key={index}>
                <div className="col-4">
                  <h3 className="text-white text-left">{cate.name}</h3>
                </div>
                <div className="col-4">
                  <Link
                    className="btn btn-success"
                    to={`/admin/category/update/${cate._id}`}
                  >
                    <span className="">Update</span>
                  </Link>
                </div>
                <div className="col-4">
                  <button
                    onClick={() => {
                      deleteThisCategory(cate._id);
                    }}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
}

export default ManageCategories;
