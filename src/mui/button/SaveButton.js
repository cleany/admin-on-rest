import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import translate from '../../i18n/translate';

export class SaveButton extends Component {
    handleClick = e => {
        if (this.props.saving) {
            // prevent double submission
            e.preventDefault();
        } else {
            // always submit form explicitly regardless of button type
            const { handleSubmitWithRedirect, redirect } = this.props;
            if (e) {
                e.preventDefault();
            }
            handleSubmitWithRedirect(redirect)();
        }
    };

    render() {
        const {
            saving,
            label = 'aor.action.save',
            raised = true,
            translate,
            submitOnEnter,
            redirect,
            disabled = false,
        } = this.props;
        const successStyle = {
          bg: '#3DCC91',
          label: "#FFFFFF",
        };
        const type = submitOnEnter ? 'submit' : 'button';
        return (
            <RaisedButton
                type={type}
                label={label && translate(label, { _: label })}
                icon={
                    saving && saving.redirect === redirect ? (
                        <CircularProgress size={25} thickness={2} />
                    ) : (
                        null
                    )
                }
                onClick={this.handleClick}
                backgroundColor={successStyle.bg}
                labelColor={successStyle.label}
                disabled={disabled}
            />
        );
    }
}

SaveButton.propTypes = {
    label: PropTypes.string,
    raised: PropTypes.bool,
    saving: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    translate: PropTypes.func.isRequired,
    submitOnEnter: PropTypes.bool,
    handleSubmitWithRedirect: PropTypes.func,
    redirect: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    disabled: PropTypes.bool,
};

SaveButton.defaultProps = {
    handleSubmitWithRedirect: () => () => {},
};

const mapStateToProps = state => ({
    saving: state.admin.saving,
});

export default connect(mapStateToProps)(translate(SaveButton));
