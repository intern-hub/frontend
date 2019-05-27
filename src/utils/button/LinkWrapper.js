import React from 'react'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router'

/**
 * Wrap a div in this and it will go to whatever URL you want when you click on the div
 */
const LinkWrapper = (props) => {
    const {
        history,
        to,
        children
    } = props;


    const childrenWithLink = React.cloneElement(children, {
        onClick: () => {
            history.push(to);
        }
    });

    return (
        childrenWithLink
    )
};

LinkWrapper.propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
};

export default withRouter(LinkWrapper)
