import React, { Children } from 'react';
import PropTypes from 'prop-types';
import { Toolbar as MuiToolbar, ToolbarGroup } from 'material-ui/Toolbar';
import { SaveButton, CancelButton } from '../button';
import Responsive from '../layout/Responsive';

const valueOrDefault = (value, defaultValue) =>
    typeof value === 'undefined' ? defaultValue : value;

const Toolbar = ({
    invalid,
    submitOnEnter,
    handleSubmitWithRedirect,
    children,
    basePath,
}) => {
    return (
        <Responsive
            small={
                <MuiToolbar style={{ marginTop: '1em' }} noGutter>
                    <ToolbarGroup>
                        {Children.count(children) === 0 ? (
                            <div style={{ display: 'flex' }}>
                                <SaveButton
                                    handleSubmitWithRedirect={
                                        handleSubmitWithRedirect
                                    }
                                    invalid={invalid}
                                    submitOnEnter={submitOnEnter}
                                />
                                <CancelButton basePath={basePath} />
                            </div>
                        ) : (
                            Children.map(
                                children,
                                button =>
                                    button
                                        ? button.type.muiName !== 'FlatButton'
                                          ? React.cloneElement(button, {
                                                handleSubmitWithRedirect,
                                                invalid,
                                                submitOnEnter: valueOrDefault(
                                                    button.props.submitOnEnter,
                                                    submitOnEnter
                                                ),
                                            })
                                          : React.cloneElement(button)
                                        : null
                            )
                        )}
                    </ToolbarGroup>
                </MuiToolbar>
            }
            medium={
                <MuiToolbar style={{ marginTop: '2em' }} noGutter>
                    <ToolbarGroup>
                        {Children.count(children) === 0 ? (
                            <div style={{ display: 'flex' }}>
                                <SaveButton
                                    handleSubmitWithRedirect={
                                        handleSubmitWithRedirect
                                    }
                                    invalid={invalid}
                                    submitOnEnter={submitOnEnter}
                                />
                                <CancelButton basePath={basePath} />
                            </div>
                        ) : (
                            Children.map(
                                children,
                                button =>
                                    button
                                        ? button.type.muiName !== 'FlatButton'
                                          ? React.cloneElement(button, {
                                                handleSubmitWithRedirect,
                                                invalid,
                                                submitOnEnter: valueOrDefault(
                                                    button.props.submitOnEnter,
                                                    submitOnEnter
                                                ),
                                            })
                                          : React.cloneElement(button)
                                        : null
                            )
                        )}
                    </ToolbarGroup>
                </MuiToolbar>
            }
        />
    );
};

Toolbar.propTypes = {
    children: PropTypes.node,
    handleSubmitWithRedirect: PropTypes.func,
    invalid: PropTypes.bool,
    submitOnEnter: PropTypes.bool,
    basePath: PropTypes.string,
};

Toolbar.defaultProps = {
    submitOnEnter: true,
};

export default Toolbar;
