import React from 'react';
import {ReactComponent as SearchIcon} from "../../../../img/search.svg"

import PropTypes from 'prop-types';

import "./Search.css";

export class Search extends React.PureComponent {

    render() {
        return (
            <div className="s">
                <input value={this.props.value} onChange={this.props.onChange} className="search-input"/>
                <SearchIcon className="s__i"/>
            </div>
        )
    }
}

Search.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};
