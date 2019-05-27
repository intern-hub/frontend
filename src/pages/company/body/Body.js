import React from 'react';
import {InternshipCard} from "../internship_card/InternshipCard";
import PropTypes from 'prop-types';

export class Body extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            internships: []
        }
    }

    componentDidMount() {
        fetch(`http://internhub.us.to/api/positions?coname=${this.props.name}`)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                const result = json.sort((intern1, intern2) => intern1.title.localeCompare(intern2.title));
                this.setState({internships: result});
            }).catch(() => {
            this.setState({internships: []});
        });
    }

    render() {
        let internshipCards = this.state.internships.map((internship) => <InternshipCard key={internship.id}
                                                                                           name={internship.title}
                                                                                           link={internship.link} />);

        if(internshipCards.length === 0)
            internshipCards = [<InternshipCard key="unique" name={"No internships found!"} link="#" active={false}/>];

        return (
            <div className="body">
                <div className="body__title"> INTERNSHIPS</div>
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
