import React from 'react';
import {Search} from "./search/Search";
import "./Body.css";
import {CompanyCard} from "./company_card/CompanyCard";
import Select from 'react-select';
import {Button} from "../../../utils/button/Button";

import {ReactComponent as SortIcon} from "../../../img/heroicons/icon-trending-up.svg"
import {cancellableFetch, myFetch} from "../../../utils/MyFetch";
import {toast} from "react-toastify";
import Modal from 'react-modal';
import {MyInput} from "../../../utils/input/MyInput";

Modal.setAppElement('#root');

let fetchData;

const modalStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

export class Body extends React.Component {

    constructor(props) {
        super(props);

        let sortTypes = [
            {value: (comp1, comp2) => comp1.name.localeCompare(comp2.name), label: 'Alphabetical'},
            {value: (comp1, comp2) => comp2.popularity - comp1.popularity, label: 'By Popularity'},
        ];

        this.state = {
            companies: [],
            filteredCompanies: [],
            searchValue: '',

            suggestion: '',
            modelOpen: false,

            sortTypes: sortTypes,
            sortType: sortTypes[0],
        };
    }

    componentDidMount() {
        fetchData = cancellableFetch(fetch("https://internhub.us.to/api/companies"));
        fetchData.promise.then((response) => {
            return response.json();
        })
            .then((json) => {
                this.setState({companies: json, filteredCompanies: json});

                // TODO add back in when can figure out a way to make it smoother for the user
                /*
                let lastClickedCompany = window.localStorage.getItem("last-clicked-company");
                if (!lastClickedCompany)
                    return;

                let lastClickedCompanyEl = document.getElementById(lastClickedCompany);
                if (lastClickedCompanyEl) {
                    lastClickedCompanyEl.scrollIntoView();
                }
                */
            });
    }

    componentWillUnmount() {
        fetchData.cancel();
    }

    handleSortType(evt) {
        this.setState({sortType: {label: evt.label, value: evt.value}});
    }

    openModal() {
        this.setState({modalOpen: true});
    }

    closeModal() {
        this.setState({modalOpen: false});
    }

    onChangeSuggestion(e) {
        this.setState({suggestion: e.target.value});
    }

    onSubmitSuggestion(e) {
        this.closeModal();

        const token = window.localStorage.getItem("token");
        myFetch('https://internhub.us.to/api/suggestions', {
            body: JSON.stringify({
                content: this.state.suggestion
            }),
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
            method: 'POST'
        }).then(response => {
            toast.success('Thank you for the suggestion! We will evaluate your request soon.');
            this.setState({suggestion: ''});
        }).catch(err => {
            toast.error(err.message);
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
        const isAuthenticated = window.localStorage.getItem("token") != null;
        const companyList = this.state.filteredCompanies.sort(this.state.sortType.value).map(companyObj => <CompanyCard
            key={companyObj.id}
            id={companyObj.id}
            name={companyObj.name}
            popularity={companyObj.popularity}/>);

        return (
            <div className="body">
                <div className="body__title"> Companies</div>

                <div className="search">
                    <span className="select__label">Search Companies</span>
                    <Search onChange={this.onCompanySearch.bind(this)} value={this.state.searchValue}/>
                </div>

                <div className="select__list">
                    <div className="select__item-alone">
                        <span className="select__label">Sort Companies</span>
                        <div className="select__sorting">
                            <Select value={this.state.sortType} onChange={this.handleSortType.bind(this)}
                                    className="select__body"
                                    options={this.state.sortTypes}/>
                            <SortIcon className="select__sorting__icon"/>
                        </div>
                    </div>
                </div>

                <div className="company-list">
                    {companyList}
                </div>

                {isAuthenticated ? <div className="request-button-container">
                    <Button className="request-button" label={"Are we missing a company? Request it here."}
                            onClick={this.openModal.bind(this)}/>
                </div> : null}

                <Modal isOpen={this.state.modalOpen}
                       style={modalStyles}
                       onRequestClose={this.closeModal.bind(this)}>
                    <form onSubmit={this.onSubmitSuggestion.bind(this)}>
                        <div className="modal__container">
                            <div className="modal__title">Request a Company</div>
                            <MyInput type="text" className="modal__input"
                                   value={this.state.suggestion}
                                   onChange={this.onChangeSuggestion.bind(this)}/>
                            <div className="modal__buttons">
                                <Button label={"Submit"} className="modal__button-submit"/>
                                <Button label={"Close"} className="modal__button-close" onClick={this.closeModal.bind(this)}/>
                            </div>
                        </div>
                    </form>
                </Modal>
            </div>
        )
    }
}
