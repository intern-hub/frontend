import React from 'react';
import {ApplicationCard} from "../application_card/ApplicationCard";
import PropTypes from 'prop-types';

import {getTotalApplications} from "../../../actions/Auth";

export class Body extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            applications: [],
        }
    }

    componentDidMount() {
        getTotalApplications().then((applications) => {
            this.setState({applications: applications});
        });
    }

    render() {
        let filteredApplications = this.state.applications
            .filter((application) => application.applied)
            .sort((a, b) => {
                let seasons = {'SPRING' : 0.1, 'SUMMER' : 0.2, 'FALL' : 0.3, 'WINTER' : 0.4};
                let ascore = seasons[a.position.season] + a.position.year;
                let bscore = seasons[b.position.season] + b.position.year;
                if (ascore !== bscore) {
                    return bscore - ascore;
                }
                return a.position.company.name.localeCompare(b.position.company.name);
            });

        let applicationCards = filteredApplications.map((application) =>
            <ApplicationCard
                key={application.id}
                id={application.id}
                position={application.position}
            />);

        return (
          <div className="body">
              <div className="body__title">
                  Your History 
              </div>
              <div className="body__description">
                  This is an active list of positions that you have applied to. 
                  It is sorted by position start date and company lexographic order.
              </div>
              <div className="company-list">
                  {applicationCards}
              </div>
          </div>
        )
    }
}

Body.propTypes = {
    name: PropTypes.string.isRequired,
};
