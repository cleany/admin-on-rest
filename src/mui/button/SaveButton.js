import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
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
            translate,
            submitOnEnter,
            redirect,
            disabled = false,
        } = this.props;
        const successStyle = {
            bg: '#3DCC91',
            bgHover: '#2E996D',
            label: '#FFFFFF',
        };
        const type = submitOnEnter ? 'submit' : 'button';
        return (
            <FlatButton
                type={type}
                label={label && translate(label, { _: label })}
                icon={
                    saving && saving.redirect === redirect ? (
                        <CircularProgress
                            size={24}
                            thickness={2}
                            color="#ffffff"
                        />
                    ) : null
                }
                onClick={this.handleClick}
                backgroundColor={successStyle.bg}
                hoverColor={successStyle.bgHover}
                labelStyle={{
                    color: successStyle.label,
                    fontSize: 12,
                }}
                disabled={disabled}
            />
        );
    }
}

SaveButton.propTypes = {
    label: PropTypes.string,
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
