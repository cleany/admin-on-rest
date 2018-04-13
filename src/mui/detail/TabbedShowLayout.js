import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'material-ui/Tabs';


/**
 *
  styles: {
    tabs: {
      Style for container for the tabs
    },
    inkBar: {
      Style for showing when a tab is active
    },
    activeButton: {
      Style for Tab active
    },
    button: {
      Style for Tab inactive
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
            children,
            contentContainerStyle,
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
                                label={translate(tab.props.label, {
                                    _: tab.props.label,
                                })}
                                value={index}
                                icon={tab.props.icon}
                                buttonStyle={index === this.state.value ? styles.activeButton : styles.button}
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
    children: PropTypes.node,
    contentContainerStyle: PropTypes.object,
    record: PropTypes.object,
    resource: PropTypes.string,
    basePath: PropTypes.string,
    translate: PropTypes.func,
    version: PropTypes.number,
    styles: PropTypes.object,
};

TabbedShowLayout.defaultProps = {
    contentContainerStyle: { borderTop: 'solid 1px #e0e0e0' },
    styles: {},
};

export default TabbedShowLayout;
