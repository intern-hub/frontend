import React from 'react';

import "./InternshipCard.css";
import PropTypes from 'prop-types';
import ExternalLinkWrapper from "../../../utils/button/ExternalLinkWrapper";

import {ReactComponent as EditIcon} from "../../../img/heroicons/icon-edit.svg"
import {ReactComponent as CheckIcon} from "../../../img/heroicons/icon-check-circle.svg"
import {ReactComponent as FlagIcon} from "../../../img/heroicons/icon-flag.svg"

export class InternshipCard extends React.PureComponent {

    render() {
        if (this.props.active) {
            return (
                <div className="is-wrapper">
                  <ExternalLinkWrapper to={this.props.link}>
                    <div className="is-name">
                        {this.props.name}
                    </div>
                  </ExternalLinkWrapper>
                  <div className="is-buttons">
                      <button className="is-button"><EditIcon/></button>
                      <button className="is-button"><CheckIcon/></button>
                      <button className="is-button"><FlagIcon/></button>
                  </div>
                </div>
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
