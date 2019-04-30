import React from 'react';
import {Search} from "./search/Search";
import "./Body.css";

export class Body extends React.Component {

    render() {
        return (
            <div className="b">
                <div className="b__t"> Current Internships </div>
                <Search/>

            </div>
        )
    }
}
