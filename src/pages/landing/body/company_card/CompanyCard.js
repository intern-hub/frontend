import React from 'react';

import "./CompanyCard.css";
import PropTypes from 'prop-types';
import LinkWrapper from "../../../../utils/button/LinkWrapper";

import {ReactComponent as PopularityIcon} from "../../../../img/star.svg";

export class CompanyCard extends React.PureComponent {

    onClick() {
        window.localStorage.setItem("last-clicked-company", this.props.name);
    }

    render() {
        return (
            <LinkWrapper to={`/company/${this.props.name}`} >
                <div id={this.props.name} className="company-wrapper" onClick={this.onClick.bind(this)} role="button">
                    <div className="company-name">
                        {this.props.name}
                    </div>
                    <div className="company-info">
                      <span className="company-popularity">{this.props.popularity}</span>&nbsp;<PopularityIcon width="26" height="26" style={{fill: "#61BCC1"}}/>
                    </div>
                </div>
            </LinkWrapper>
        )
    }
}

CompanyCard.propTypes = {
    name: PropTypes.string.isRequired,
};
