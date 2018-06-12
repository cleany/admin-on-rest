import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Snackbar from 'material-ui/Snackbar';
import { hideNotification as hideNotificationAction } from '../../actions/notificationActions';
import translate from '../../i18n/translate';

function getStyles(context) {
    if (!context) return { success: '#00bcd4', accent1Color: '#ff4081' };
    const {
        muiTheme: { baseTheme: { palette: { success, accent1Color } } },
    } = context;
    return { success, accent1Color };
}

class Notification extends React.Component {
    handleRequestClose = () => {
        this.props.hideNotification();
    };

    render() {
        const style = { textAlign: 'center' };
        const { success, accent1Color } = getStyles(this.context);
        const { type, translate, message, translateVars } = this.props;

        if (type === 'warning') {
            style.backgroundColor = accent1Color;
        }
        if (type === 'confirm' || type === 'info') {
            style.backgroundColor = success;
        }
        return (
            <Snackbar
                open={!!message}
                message={!!message && translate(message, translateVars)}
                autoHideDuration={4000}
                onRequestClose={this.handleRequestClose}
                bodyStyle={style}
            />
        );
    }
}

Notification.propTypes = {
    message: PropTypes.string,
    type: PropTypes.string.isRequired,
    hideNotification: PropTypes.func.isRequired,
    translate: PropTypes.func.isRequired,
    translateVars: PropTypes.object,
};

Notification.defaultProps = {
    type: 'info',
    translateVars: {},
};

Notification.contextTypes = {
    muiTheme: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    message: state.admin.notification.text,
    translateVars: state.admin.notification.translateVars,
    type: state.admin.notification.type,
});

export default translate(
    connect(mapStateToProps, { hideNotification: hideNotificationAction })(
        Notification
    )
);
