import React from 'react';

import "./InternshipCard.css";
import PropTypes from 'prop-types';
import ExternalLinkWrapper from "../../../utils/button/ExternalLinkWrapper";

import {ReactComponent as NotesIcon} from "../../../img/heroicons/icon-edit.svg"
import {ReactComponent as AppliedIcon} from "../../../img/heroicons/icon-check-circle.svg"
import {ReactComponent as BrokenIcon} from "../../../img/heroicons/icon-flag.svg"

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
                      <button className="is-button"><NotesIcon/></button>
                      <button className="is-button"><AppliedIcon/></button>
                      <button className="is-button"><BrokenIcon/></button>
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
