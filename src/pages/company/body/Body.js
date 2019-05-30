import React from 'react';
import {InternshipCard} from "../internship_card/InternshipCard";
import PropTypes from 'prop-types';

import Select from 'react-select';

const selectStyles = {
  option: (provided, state) => ({
      ...provided,
      fontFamily: 'IBM Plex Sans',
  })
};

export class Body extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            internships: [],
            locations: [],
            titles: [],
            degrees: [],
            dates: [],


            location: {value: 'All', label: 'All'},
            degree: {value: 'All', label: 'All'},
            title: {value: 'All', label: 'All'},
            date: {value: 'All', label: 'All'},
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
              
                const dates = ["All", ...new Set(result.map(is => is.season + ' ' + is.year))].map((e) => {
                    return {
                        label: e,
                        value: e === "All" ? "All" : [e.split(' ')[0], parseInt(e.split(' ')[1])]
                    }
                });

                this.setState({internships: result, locations: locations, titles: titles, degrees: degrees, dates: dates});
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
  
    handleDate(evt) {
        this.setState({date: {label: evt.label, value: evt.value}});
    }

    render() {

        let filteredInternships = this.state.internships;
        filteredInternships = filteredInternships.filter((internship) => this.state.location.value === "All" || internship.location === this.state.location.value);
        filteredInternships = filteredInternships.filter((internship) => this.state.title.value === "All" || internship.title === this.state.title.value);
        filteredInternships = filteredInternships.filter((internship) => this.state.degree.value === "All" || internship.degree === this.state.degree.value);
        filteredInternships = filteredInternships.filter((internship) => this.state.date.value === "All" || 
            (internship.season === this.state.date.value[0] && internship.year === this.state.date.value[1]));

        filteredInternships = filteredInternships.sort((internshipCards) => internshipCards.title);
        let internshipCards = filteredInternships.map((internship) => <InternshipCard key={internship.id}
                                                                                      name={internship.title}
                                                                                      link={internship.link}/>);
        let filterSelections = <div class="select__list">
              <div className="select__item">
                  <span className="select__label">Filter by Location</span>
                  <Select value={this.state.location} onChange={this.handleLocation.bind(this)}
                          styles={selectStyles} className="select__body"
                          options={this.state.locations}/>
              </div>

              <div className="select__item">
                  <span className="select__label">Filter by Title</span>
                  <Select value={this.state.title} onChange={this.handleTitle.bind(this)}
                          styles={selectStyles} className="select__body"
                          options={this.state.titles}/>
              </div>

              <div className="select__item">
                  <span className="select__label">Filter by Degree</span>
                  <Select value={this.state.degree} onChange={this.handleDegree.bind(this)}
                          styles={selectStyles} className="select__body"
                          options={this.state.degrees}/>
              </div>

              <div className="select__item">
                  <span className="select__label">Filter by Season & Year</span>
                  <Select value={this.state.date} onChange={this.handleDate.bind(this)}
                          styles={selectStyles} className="select__body"
                          options={this.state.dates}/>
              </div>
        </div>;

        if (internshipCards.length === 0) {
            internshipCards = [<InternshipCard key="unique" name={"No internships found!"} link="#" active={false}/>];
            filterSelections = <div></div>;
        }

        return (
            <div className="body">
                <div className="body__title">Internships <span className="body__subtitle">at {this.props.name}</span></div>
                {filterSelections} 
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
