import React from 'react';

import "./InternshipCard.css";
import PropTypes from 'prop-types';
import ExternalLinkWrapper from "../../../utils/button/ExternalLinkWrapper";

export class InternshipCard extends React.PureComponent {

    render() {
        if (this.props.active) {
            return (
                <ExternalLinkWrapper to={this.props.link}>
                    <div className="is-wrapper">
                        <div className="is-name">
                            {this.props.name}
                        </div>
                    </div>
                </ExternalLinkWrapper>
            )
        } else {
            return (
                <div className="is-wrapper">
                    <div className="is-name">
                        {this.props.name}
                    </div>
                </div>
            )
        }
    }
}

InternshipCard.propTypes = {
    name: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    active: PropTypes.bool
};

InternshipCard.defaultProps = {
    name: "No internships found",
    active: true
};
