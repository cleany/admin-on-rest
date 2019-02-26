import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'material-ui/Tabs';

/**
 *
  styles: {
    tabs: {
      Style for tabs container
    },
    inkBar: {
      Style for bar under the active Tab
    },
    activeButton: {
      Style for active Tab
    },
    button: {
      Style for inactive Tab
    },
  }
 *
**/

class TabbedShowLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
        };
    }

    handleChange = value => {
        this.setState({ value });
    };

    render() {
        const {
            addLabel,
            children,
            record,
            resource,
            basePath,
            translate,
            version,
            styles,
        } = this.props;
        return (
            <Tabs
                value={this.state.value}
                onChange={this.handleChange}
                tabItemContainerStyle={styles.tabs}
                inkBarStyle={styles.inkBar}
                key={version}
            >
                {React.Children.map(
                    children,
                    (tab, index) =>
                        tab ? (
                            <Tab
                                key={tab.props.value}
                                label={
                                    addLabel &&
                                    translate(tab.props.label, {
                                        _: tab.props.label,
                                    })
                                }
                                value={index}
                                icon={tab.props.icon}
                                buttonStyle={
                                    index === this.state.value ? (
                                        styles.activeButton
                                    ) : (
                                        styles.button
                                    )
                                }
                            >
                                {React.cloneElement(tab, {
                                    resource,
                                    record,
                                    basePath,
                                })}
                            </Tab>
                        ) : null
                )}
            </Tabs>
        );
    }
}

TabbedShowLayout.propTypes = {
    addLabel: PropTypes.bool,
    children: PropTypes.node,
    record: PropTypes.object,
    resource: PropTypes.string,
    basePath: PropTypes.string,
    translate: PropTypes.func,
    version: PropTypes.number,
    styles: PropTypes.object,
};

TabbedShowLayout.defaultProps = {
    addLabel: true,
    styles: {},
};

export default TabbedShowLayout;
