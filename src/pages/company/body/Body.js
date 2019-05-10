import React from 'react';
import {InternshipCard} from "../internship_card/InternshipCard";

export class Body extends React.PureComponent {


    componentDidMount() {
        // find all the internships here
    }

    render() {
        const internshipCards = this.props.internships.map((internship) => <InternshipCard name={internship}/>);

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


Body.defaultProps = {
    internships: ["Backend software engineering", "frontend software engineering", "coffee intern"]
};
