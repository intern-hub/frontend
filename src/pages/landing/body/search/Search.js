import React from 'react';
import {ReactComponent as SearchIcon} from "../../../../img/search.svg"

import PropTypes from 'prop-types';

import "./Search.css";
import {MyInput} from "../../../../utils/input/MyInput";

export class Search extends React.PureComponent {

    render() {
        return (
            <div className="s">
                <MyInput value={this.props.value} onChange={this.props.onChange}/>
                <SearchIcon className="s__i"/>
            </div>
        )
    }
}

Search.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};
