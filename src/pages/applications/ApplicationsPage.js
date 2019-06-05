import React from 'react';
import Header from "../landing/header/Header";
import {Body} from "./body/Body";

export default class ApplicationsPage extends React.PureComponent {

    render() {
        return (
            <React.Fragment>
                <Header/>
                <Body/>
            </React.Fragment>
        )
    }
}
