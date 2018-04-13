import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import Drawer from 'material-ui/Drawer';
import { setSidebarVisibility as setSidebarVisibilityAction } from '../../actions';


// We shouldn't need PureComponent here as it's connected
// but for some reason it keeps rendering even though mapStateToProps returns the same object
class Sidebar extends PureComponent {
    handleClose = () => {
        this.props.setSidebarVisibility(false);
    };

    render() {
        const { open, setSidebarVisibility, children, muiTheme } = this.props;

        return (
          <Drawer
              docked={false}
              open={open}
              onRequestChange={setSidebarVisibility}
          >
              {React.cloneElement(children, {
                  onMenuTap: this.handleClose,
              })}
          </Drawer>
        );
    }
}

Sidebar.propTypes = {
    children: PropTypes.node.isRequired,
    open: PropTypes.bool.isRequired,
    setSidebarVisibility: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => ({
    open: state.admin.ui.sidebarOpen,
    locale: state.locale, // force redraw on locale change
});

export default compose(
    connect(mapStateToProps, {
        setSidebarVisibility: setSidebarVisibilityAction,
    })
)(Sidebar);
