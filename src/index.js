import React from 'react';
import ReactDOM from 'react-dom';

import "./index.css";

import * as serviceWorker from './serviceWorker';
import {LandingPage} from "./pages/landing/LandingPage";
import {HashRouter} from "react-router-dom";
import {Route} from "react-router";
import {CompanyPage} from "./pages/company/CompanyPage";
import {LoginPage} from "./pages/login/LoginPage";
import {RegisterPage} from "./pages/register/RegisterPage";

ReactDOM.render(
    <React.Fragment>
        <HashRouter basename={"/frontend"}>
            <Route exact path="/" component={LandingPage} />
            <Route path="/company/:name" render={(props) =>  <CompanyPage name={props.match.params.name}/> } />
            <Route exact path="/login" render={(props) =>  <LoginPage /> } />
            <Route exact path="/register" render={(props) =>  <RegisterPage /> } />

        </HashRouter>
    </React.Fragment>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
