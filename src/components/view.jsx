import React, { useRef, useState, useEffect } from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from 'axios'


export default function ViewContact(){
    const [user, setUser] = useState({})

    const {id} = useParams()

    useEffect(() => {
        axios.get(`http://localhost:5000/api/get/${id}`).then(res => {
            setUser({...res.data[0]})
        })
    }, [id])


    return(
        <>
            <div className="container py-4">
                <h1 className="display-4">User Id: {id}</h1>
                <hr />
                <ul className="list-group w-50">
                    <li className="list-group-item">First Name: {user.firstname} </li>
                    <li className="list-group-item">Last Name: {user.lastname} </li>
                    <li className="list-group-item">Email: {user.email} </li>
                    <li className="list-group-item">Phone: {user.phone} </li>
                    <li className="list-group-item">Password: {user.password} </li>
                </ul> <br/>
                <Link to="/" className="btn btn-success">
                    Back to Home
                </Link>
            </div>
        </>
    )
}

