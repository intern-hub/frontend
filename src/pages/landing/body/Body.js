import React from 'react';
import {Search} from "./search/Search";
import "./Body.css";
import {CompanyCard} from "./company_card/CompanyCard";

export class Body extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            companies:  ["Netflix", "Google", "Facebook", "Amazon", "Apple"],
        };
    }

    render() {
        const companyList = this.state.companies.map(company => <CompanyCard key={company} name={company}/>);

        return (
            <div className="body">
                <div className="body__title"> COMPANIES </div>
                <div className="search">
                    <Search/>
                </div>

                <div className="company-list">
                    {companyList}
                </div>
            </div>
        )
    }
}
