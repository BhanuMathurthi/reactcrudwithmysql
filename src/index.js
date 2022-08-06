import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Font-awesome-icons
import '/node_modules/@fortawesome/fontawesome-free/css/all.css'


import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.css";
import reportWebVitals from "./reportWebVitals";
import App from "./app";

import { BrowserRouter as Router } from "react-router-dom";

const root = createRoot(document.getElementById("root"));


root.render(
    <StrictMode>
        <Router>
            <App />
        </Router>
    </StrictMode>
);

reportWebVitals();
