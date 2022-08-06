import {Routes, Route} from "react-router-dom";
import NavBar from "./navbar";
import React from "react";
import Usersdataconfig from "./components/usersdataconfig";
import './app.css'
import AddContact from "./components/addedit";
import ViewContact from "./components/view";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function App() {

    return (
        <div className="main">
            <div>
                <NavBar />

                <ToastContainer position='top-center' />
                <Routes>
                    <Route path='/' element={<Usersdataconfig/>} />
                    <Route path='/addedit' element={<AddContact/>} />
                    <Route path='/update/:id' element={<AddContact/>} />
                    <Route path='/view/:id' element={<ViewContact/>} />
                </Routes>
            </div>
        </div>
    );
}


