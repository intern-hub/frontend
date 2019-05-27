import React from 'react';

import "./CompanyCard.css";
import PropTypes from 'prop-types';
import LinkWrapper from "../../../../utils/button/LinkWrapper";

export class CompanyCard extends React.PureComponent {

    render() {
        return (
            <LinkWrapper to={`/company/${this.props.name}`}>
                <div className="company-wrapper">
                    <div className="company-name">
                        {this.props.name}
                    </div>
                </div>
            </LinkWrapper>
        )
    }
}

CompanyCard.propTypes = {
    name: PropTypes.string.isRequired,
};
