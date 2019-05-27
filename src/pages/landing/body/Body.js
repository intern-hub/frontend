import React from 'react';
import {Search} from "./search/Search";
import "./Body.css";
import {CompanyCard} from "./company_card/CompanyCard";

export class Body extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            companies: [],
            filteredCompanies: [],
            searchValue: '',
        };
    }

    componentDidMount() {
        fetch("https://internhub.us.to/api/companies")
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                const result = json.sort((comp1, comp2) => comp1.name.localeCompare(comp2.name));
                this.setState({companies: result, filteredCompanies: result})
            });
    }

    onCompanySearch(eventObj) {
        let searchStr = eventObj.target.value;
        if (searchStr === undefined || searchStr === null) {
            console.warn("Got invalid input in search bar, returning");
            return;
        }

        let companies = this.state.companies.filter((company) => company.name.toLowerCase().startsWith(searchStr.toLowerCase()));
        this.setState({searchValue: searchStr, filteredCompanies: companies});
    }

    render() {
        const companyList = this.state.filteredCompanies.map(companyObj => <CompanyCard key={companyObj.id} id={companyObj.id} name={companyObj.name}/>);

        return (
            <div className="body">
                <div className="body__title"> COMPANIES</div>
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
