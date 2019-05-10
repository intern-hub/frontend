import React from 'react';
import ReactDOM from 'react-dom';

import "./index.css";

import * as serviceWorker from './serviceWorker';
import {LandingPage} from "./pages/landing/LandingPage";
import {BrowserRouter} from "react-router-dom";
import {Route} from "react-router";
import {CompanyPage} from "./pages/company/CompanyPage";

ReactDOM.render(
    <React.Fragment>
        <BrowserRouter basename={"/frontend"}>
            <Route exact path="/" component={LandingPage} />
            <Route path="/company/:name" render={(props) =>  <CompanyPage name={props.match.params.name}/> } />

        </BrowserRouter>
    </React.Fragment>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
