import React from 'react';
import Header from "../landing/header/Header";
import {Body} from "./body/Body";

export class CompanyPage extends React.PureComponent {

    render() {
        return (
            <React.Fragment>
                <Header/>
                <Body name={this.props.name} />
            </React.Fragment>
        )
    }
}
