import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BreadcrumbLink extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hover: false,
        };
        this.hoverOn = this.hoverOn.bind(this);
        this.hoverOff = this.hoverOff.bind(this);
    }

    hoverOn() {
        this.setState({ hover: true });
    }

    hoverOff() {
        this.setState({ hover: false });
    }

    render() {
        const { url, text, styles } = this.props;
        return (
            <a
                href={url}
                style={this.state.hover ? styles.hover : styles.noHover}
                onMouseEnter={this.hoverOn}
                onMouseLeave={this.hoverOff}
            >
                {text}
            </a>
        );
    }
}

BreadcrumbLink.propTypes = {
    url: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    styles: PropTypes.object,
};

export default BreadcrumbLink;
