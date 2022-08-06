import React, { useRef, useState, useEffect } from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from 'axios'
import {
    faCheck,
    faTimes,
    faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {toast } from 'react-toastify';


export default function AddContact(){

    const {id} = useParams()

    useEffect(() => {
        axios.get(`http://localhost:5000/api/get/${id}`).then(res => {
            setUserstate({...res.data[0]})
        })
    }, [id])

    const [userstate, setUserstate] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        password: "",
    })

    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [validPhone, setValidPhone] = useState(false);
    const [phoneFocus, setPhoneFocus] = useState(false);

    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);



    const{firstname, lastname, email, phone, password} = userstate

    const EMAIL_REGEX =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const PHONE_REGEX = /^[6-9]\d{9}$/;
    const PASSWORD_REGEX =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[0-9])(?=.*[!@#$%^&*-]{2})[A-Za-z\d!@#$%^&*-]{8,12}$/;


    const navigate = useNavigate()

    const userRef = useRef();


    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
        setValidPhone(PHONE_REGEX.test(phone));
        setValidPassword(PASSWORD_REGEX.test(password));
    }, [email, phone, password]);

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!firstname || !lastname || !email || !phone || !password){
            toast.error("please provide value into each input field")
        } else{
            if(!id){
                axios.post("http://localhost:5000/api/post", {
                    firstname, lastname, email, phone, password
                }).then(() => {
                    setUserstate({firstname: "", lastname: "", email: "", phone: "", password: ""})
                }).catch((err) =>
                    toast.error(err.response.data)
                )
                toast.success("Contact Added Successfully")
            }else{
                axios.put(`http://localhost:5000/api/update/${id}`, {
                    firstname, lastname, email, phone, password
                }).then(() => {
                    setUserstate({firstname: "", lastname: "", email: "", phone: "", password: ""})
                }).catch((err) =>
                    toast.error(err.response.data)
                )
                toast.success('Contact Updated Successfully')
            }
            setTimeout(() => {
                navigate('/')
            }, 500)
        }
    }

    const handleChange = (e) => {
        const {name, value} = e.target
        setUserstate({...userstate, [name]: value})
    }


    return(
        <>
            <section className="py-5" style={{ backgroundColor: "#eee" }}>
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-12 col-xl-11">
                            <div className="card text-black" style={{ borderRadius: "25px" }}>
                                <div className="card-body p-md-5">
                                    <div className="row justify-content-center">
                                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                            <p className="text-center text-primary h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                                                Sign Up
                                            </p>
                                            
                                            <form onSubmit={handleSubmit}>
                                                <div className="row mt-3">
                                                    <div className='col-md-6'>
                                                        <label className="text-dark" htmlFor="firstname">
                                                            First Name:
                                                        </label>
                                                        <input
                                                               ref={userRef}
                                                               type="text"
                                                               id="firstname"
                                                               name="firstname"
                                                               value={firstname || ''}
                                                               className='form-control'
                                                               style={{backgroundColor: "#dff7f6"}}
                                                               autoComplete="off"
                                                               onChange={handleChange}
                                                               required
                                                        />
                                                    </div>
                                                    <div className='col-md-6'>
                                                        <label className="text-dark" htmlFor="lastname">
                                                            Last Name:
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="lastname"
                                                            className='form-control'
                                                            style={{backgroundColor: "#dff7f6"}}
                                                            autoComplete="off"
                                                            name="lastname"
                                                            onChange={handleChange}
                                                            value={lastname || ''}
                                                            required
                                                        />
                                                    </div>
                                                </div>

                                                <label className="text-dark" htmlFor="email">
                                                    Email:
                                                    <FontAwesomeIcon
                                                        icon={faCheck}
                                                        className={validEmail ? "valid" : "hide"}
                                                    />
                                                    <FontAwesomeIcon
                                                        icon={faTimes}
                                                        className={
                                                            validEmail || !email ? "hide" : "invalid"
                                                        }
                                                    />
                                                </label>
                                                <input
                                                    type="email"
                                                    className='form-control'
                                                    style={{backgroundColor: "#dff7f6"}}
                                                    name="email"
                                                    onChange={handleChange}
                                                    value={email || ''}
                                                    id="email"
                                                    required
                                                    aria-invalid={validEmail ? "false" : "true"}
                                                    onFocus={() => setEmailFocus(true)}
                                                    onBlur={() => setEmailFocus(false)}
                                                />
                                                <p
                                                    id="emailnote"
                                                    className={
                                                        emailFocus && !validEmail
                                                            ? "instructions"
                                                            : "offscreen"
                                                    }
                                                >
                                                    <FontAwesomeIcon icon={faInfoCircle} />
                                                    Should be a valid email
                                                    <br />
                                                    Allowed special characters: <br />
                                                    <span aria-label="at symbol">@</span>{" "}
                                                </p>

                                                <label className="text-dark" htmlFor="phone">
                                                    Phone:
                                                    <FontAwesomeIcon
                                                        icon={faCheck}
                                                        className={validPhone ? "valid" : "hide"}
                                                    />
                                                    <FontAwesomeIcon
                                                        icon={faTimes}
                                                        className={
                                                            validPhone || !phone ? "hide" : "invalid"
                                                        }
                                                    />
                                                </label>
                                                <input
                                                    type="phone"
                                                    className='form-control'
                                                    style={{backgroundColor: "#dff7f6"}}
                                                    name="phone"
                                                    onChange={handleChange}
                                                    value={phone || ''}
                                                    id="phone"
                                                    required
                                                    aria-invalid={validPhone ? "false" : "true"}
                                                    onFocus={() => setPhoneFocus(true)}
                                                    onBlur={() => setPhoneFocus(false)}
                                                />
                                                <p
                                                    id="phonenote"
                                                    className={
                                                        phoneFocus && !validPhone
                                                            ? "instructions"
                                                            : "offscreen"
                                                    }
                                                >
                                                    <FontAwesomeIcon icon={faInfoCircle} />
                                                    Must be an indian mobile number
                                                    <br />
                                                    upto 10 digits <br />
                                                </p>


                                                <label className="text-dark" htmlFor="password">
                                                    Password:
                                                    <FontAwesomeIcon
                                                        icon={faCheck}
                                                        className={validPassword ? "valid" : "hide"}
                                                    />
                                                    <FontAwesomeIcon
                                                        icon={faTimes}
                                                        className={
                                                            validPassword || !password ? "hide" : "invalid"
                                                        }
                                                    />
                                                </label>
                                                <input
                                                    type="password"
                                                    className='form-control'
                                                    style={{backgroundColor: "#dff7f6"}}
                                                    name="password"
                                                    onChange={handleChange}
                                                    value={password || ''}
                                                    id="password"
                                                    required
                                                    aria-invalid={validPassword ? "false" : "true"}
                                                    onFocus={() => setPasswordFocus(true)}
                                                    onBlur={() => setPasswordFocus(false)}
                                                />
                                                <p
                                                    id="pwdnote"
                                                    className={
                                                        passwordFocus && !validPassword
                                                            ? "instructions"
                                                            : "offscreen"
                                                    }
                                                >
                                                    <FontAwesomeIcon icon={faInfoCircle} />
                                                    At least 8 characters and at most 12 characters.
                                                    <br />
                                                    At least one Uppercase character & one numeric & At
                                                    least two special characters
                                                    <br />
                                                    Allowed special characters:{" "}
                                                    <span aria-label="exclamation mark">!</span>{" "}
                                                    <span aria-label="at symbol">@</span>{" "}
                                                    <span aria-label="hashtag">#</span>{" "}
                                                    <span aria-label="dollar sign">$</span>{" "}
                                                    <span aria-label="percent">%</span>{" "}
                                                    <span aria-label="percent">&</span>{" "}
                                                    <span aria-label="percent">^</span>
                                                </p>

                                                <input type='submit'
                                                       value={id ? 'Update' : 'Save'}
                                                       className="my-4 btn btn-warning"
                                                       disabled={
                                                           !validPassword && !validEmail && !validPhone
                                                               ? true
                                                               : false
                                                       }
                                                />
                                            </form>
                                            <Link to={`/`} className="btn btn-dark px-4">
                                                Back
                                            </Link>
                                        </div>
                                        <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                            <img
                                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                                className="img-fluid"
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

