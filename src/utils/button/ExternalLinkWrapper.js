import React from 'react'
import PropTypes from 'prop-types'

/**
 * Wrap a div in this and it will go to whatever external URL you want when you click on the div
 */
const ExternalLinkWrapper = (props) => {
    const {
        to,
        children
    } = props;


    const childrenWithLink = React.cloneElement(children, {
        onClick: () => {
            window.open(to);
        }
    });

    return (
        childrenWithLink
    )
};

ExternalLinkWrapper.propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
};

export default ExternalLinkWrapper;

