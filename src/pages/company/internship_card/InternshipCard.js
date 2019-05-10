import React from 'react';

import "./InternshipCard.css";
import PropTypes from 'prop-types';

export class InternshipCard extends React.PureComponent {

    render() {
        return (
            <div className="is-wrapper">
                <div className="is-name">
                    {this.props.name}
                </div>
            </div>
        )
    }
}

InternshipCard.propTypes = {
    name: PropTypes.string.isRequired,
};
