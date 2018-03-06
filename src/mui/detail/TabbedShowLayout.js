import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'material-ui/Tabs';

const styles = {
  tabs: {
    width: '600px',
    maxWidth: '100%',
    height: '34px',
    borderRadius: '17px',
    backgroundColor: 'rgba(31,51,61,.08)',
    margin: '0 auto 32px',
    display: 'block',
    padding: '2px',
    boxSizing: 'border-box',
  },
  inkBar: {
    display: 'none',
  },
  button: {
    height: '30px',
    borderRadius: '15px',
    color: 'rgba(31,51,61,.4)',
    fontSize: '12px',
    fontWeight: 800,
  },
  activeButton: {
    height: '30px',
    borderRadius: '15px',
    backgroundColor: '#FFFFFF',
    color: '#3CA3DB',
    fontSize: '12px',
    fontWeight: 600,
    boxShadow: '0 0 2px 0 rgba(0,0,0,.1)',
  },
  container: {
    overflow: 'hidden',
    padding: '1em',
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)',
    backgroundColor: '#FFFFFF',
    borderRadius: '6px',
  },
};

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
        } = this.props;
        return (
            <div key={version} style={styles.container}>
                <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                    tabItemContainerStyle={styles.tabs}
                    inkBarStyle={styles.inkBar}
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
            </div>
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
};

TabbedShowLayout.defaultProps = {
    contentContainerStyle: { borderTop: 'solid 1px #e0e0e0' },
};

export default TabbedShowLayout;
