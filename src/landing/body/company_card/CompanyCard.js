import React from 'react';

import "./CompanyCard.css";

import Netflix from "../../../img/netflix.png";
import PropTypes from 'prop-types';

export class CompanyCard extends React.PureComponent {

    render() {
        return (
            <div className="company-wrapper">
                <img src={Netflix} width={50} height={50} alt={"netflix"}/>

                <div className="company-name">
                    {this.props.name}
                </div>

                <div className="apply-link">
                    Apply Here
                </div>
            </div>
        )
    }
}

CompanyCard.propTypes = {
    name: PropTypes.string.isRequired,
};
