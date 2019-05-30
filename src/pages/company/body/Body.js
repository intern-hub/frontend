import React from 'react';
import {InternshipCard} from "../internship_card/InternshipCard";
import PropTypes from 'prop-types';

import Select from 'react-select';

export class Body extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            internships: [],
            locations: [],
            titles: [],
            degrees: [],


            location: {value: 'All', label: 'All'},
            degree: {value: 'All', label: 'All'},

            title: {value: 'All', label: 'All'},
        }
    }

    componentDidMount() {
        fetch(`https://internhub.us.to/api/positions?coname=${this.props.name}`)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                const result = json.sort((intern1, intern2) => intern1.title.localeCompare(intern2.title));
                const locations = ["All", ...new Set(result.map(is => is.location))].map((e) => {
                    return {
                        label: e,
                        value: e
                    }
                });

                const titles = ["All", ...new Set(result.map(is => is.title))].map((e) => {
                    return {
                        label: e,
                        value: e
                    }
                });

                const degrees = ["All", ...new Set(result.map(is => is.degree))].map((e) => {
                    return {
                        label: e,
                        value: e
                    }
                });

                this.setState({internships: result, locations: locations, titles: titles, degrees: degrees});
            }).catch(() => {
            this.setState({internships: []});
        });
    }

    handleLocation(evt) {
        this.setState({location: {label: evt.label, value: evt.label}})
    }

    handleTitle(evt) {
        this.setState({title: {label: evt.label, value: evt.label}});
    }

    handleDegree(evt) {
        this.setState({degree: {label: evt.label, value: evt.label}});
    }

    render() {

        let filteredInternships = this.state.internships;
        filteredInternships = filteredInternships.filter((internship) => this.state.location.value === "All" || internship.location === this.state.location.value);
        filteredInternships = filteredInternships.filter((internship) => this.state.title.value === "All" || internship.title === this.state.title.value);
        filteredInternships = filteredInternships.filter((internship) => this.state.degree.value === "All" || internship.degree === this.state.degree.value);

        filteredInternships = filteredInternships.sort((internshipCards) => internshipCards.title);
        let internshipCards = filteredInternships.map((internship) => <InternshipCard key={internship.id}
                                                                                      name={internship.title}
                                                                                      link={internship.link}/>);
        if (internshipCards.length === 0)
            internshipCards = [<InternshipCard key="unique" name={"No internships found!"} link="#" active={false}/>];

        return (
            <div className="body">
                <div className="body__title"> INTERNSHIPS</div>
                <div> Location</div>
                <Select value={this.state.location} onChange={this.handleLocation.bind(this)}
                        options={this.state.locations}/>

                <div> Titles </div>
                <Select value={this.state.title} onChange={this.handleTitle.bind(this)}
                        options={this.state.titles}/>

                <div> Degree </div>
                <Select value={this.state.degree} onChange={this.handleDegree.bind(this)}
                        options={this.state.degrees}/>

                <div className="company-list">
                    {internshipCards}
                </div>
            </div>
        )
    }
}

Body.propTypes = {
    name: PropTypes.string.isRequired,
};
