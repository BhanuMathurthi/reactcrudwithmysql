import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaEdit, FaRegEye, FaRegEyeSlash, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

export default function Usersdataconfig() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadUserdata();
  }, []);

  const loadUserdata = async () => {
    const response = await axios.get("http://localhost:5000/api/get");
    setData(response.data);
    setLoading(true);
  };

  const deleteContact = (id) => {
    if (window.confirm("Are you sure you want to delete this contact ?")) {
      axios.delete(`http://localhost:5000/api/remove/${id}`);
      toast.success("Contact Deleted Successfully");
      setTimeout(() => {
        loadUserdata();
      }, 500);
    }
  };

  return (
    <>
      <section>
        <div className="container my-5">
          <h2 className="fs-4 mb-2 text-dark">
            <strong>Created User Data</strong>
          </h2>
          <br />
          <Link to="/addedit" className="btn btn-success mb-3">
            Add New Data
          </Link>
          {/*<div className='d-flex justify-content-center'>*/}
          {/*    */}
          {/*</div>*/}
          <div className="table-responsive table-bordered">
          <table className="table">
            <thead className="bg-primary text-white">
              <tr>
                <th scope="col">S.No</th>
                <th className="text-center" scope="col">
                  First Name
                </th>
                <th className="text-center" scope="col">
                  Last Name
                </th>
                <th className="text-center" scope="col">
                  Email
                </th>
                <th className="text-center" scope="col">
                  Phone
                </th>
                <th className="text-center" scope="col">
                  Password
                </th>
                <th className="text-center" scope="col">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {loading &&
                data &&
                data.map((user, index) => (
                  <tr key={user.id}>
                    <td className="align-middle text-center">{index + 1}</td>
                    <td className="align-middle text-center">
                      {user.firstname}
                    </td>
                    <td className="align-middle text-center">
                      {user.lastname}
                    </td>
                    <td className="align-middle text-center">{user.email}</td>
                    <td className="align-middle text-center">{user.phone}</td>
                    <td className="align-middle text-center">
                      {user.password}
                    </td>
                    <td className="text-center">
                      <Link
                        to={`/update/${user.id}`}
                        className="btn btn-warning m-2"
                      >
                        <FaEdit
                          className="text-dark"
                          style={{ fontSize: "20px" }}
                        />
                      </Link>
                      <button
                        onClick={() => deleteContact(user.id)}
                        className="btn btn-danger m-2"
                      >
                        <FaTrash style={{ fontSize: "20px" }} />
                      </button>
                      <Link
                        to={`/view/${user.id}`}
                        className="btn btn-primary m-2"
                      >
                        <FaRegEye
                          className="text-dark"
                          style={{ fontSize: "20px" }}
                        />
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          </div>
        </div>
      </section>
    </>
  );
}
