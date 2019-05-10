import React from 'react';
import {Header} from "./header/Header";
import {Body} from "./body/Body";

export class LandingPage extends React.PureComponent {


    render() {
        return (
            <React.Fragment>
                <Header />
                <Body />
            </React.Fragment>
        )
    }
}
