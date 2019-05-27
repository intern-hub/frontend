import React from 'react';
import {Search} from "./search/Search";
import "./Body.css";
import {CompanyCard} from "./company_card/CompanyCard";

export class Body extends React.Component {

    constructor(props) {
        super(props);

        const testCompanies = ["Netflix", "Google", "Facebook", "Amazon", "Apple"];

        this.state = {
            companies:  testCompanies,
            filteredCompanies: testCompanies,
            searchValue: '',
        };
    }

    onCompanySearch(eventObj) {
        let searchStr = eventObj.target.value;
        if(searchStr === undefined || searchStr === null) {
            console.warn("Got invalid input in search bar, returning");
            return;
        }

        let companies = this.state.companies.filter((company) => company.toLowerCase().startsWith(searchStr.toLowerCase()));
        this.setState({searchValue: searchStr, filteredCompanies: companies});
    }

    render() {
        const companyList = this.state.filteredCompanies.map(company => <CompanyCard key={company} name={company}/>);

        return (
            <div className="body">
                <div className="body__title"> COMPANIES </div>
                <div className="search">
                    <Search onChange={this.onCompanySearch.bind(this)} value={this.state.searchValue}/>
                </div>

                <div className="company-list">
                    {companyList}
                </div>
            </div>
        )
    }
}
