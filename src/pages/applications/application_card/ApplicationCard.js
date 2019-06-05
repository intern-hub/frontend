import React from 'react';

import "./ApplicationCard.css";
import PropTypes from 'prop-types';
import LinkWrapper from "../../../utils/button/LinkWrapper.js";

export class ApplicationCard extends React.PureComponent {

    render() {
        return (
            <div className="is-wrapper">
                <LinkWrapper to={`/company/${this.props.position.company.name}`}>
                    <div className="is-name" role="button">
                        <span className="ap-company">{this.props.position.company.name}</span>{'\u00a0—\u00a0' + this.props.position.title}
                    </div>
                </LinkWrapper>
            </div>
        )
    }
}

ApplicationCard.propTypes = {
    id: PropTypes.number.isRequired,
    position: PropTypes.object,
};
