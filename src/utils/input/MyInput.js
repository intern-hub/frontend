import React from 'react';
import PropTypes from 'prop-types';
import "./MyInput.css";
import classNames from 'classnames';

export class MyInput extends React.PureComponent {
    render() {
        const classes = classNames(this.props.className, "my-input");

        return (
            <input value={this.props.value} type={this.props.type} onChange={this.props.onChange} className={classes} />
        );
    }
}

MyInput.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    type: PropTypes.string
};

MyInput.defaultProps = {
    value: "",
    onChange: () => {},
    type: "text"
};
