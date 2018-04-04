import React, { Children, Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import getDefaultValues from './getDefaultValues';
import FormInput from './FormInput';
import Toolbar from './Toolbar';

const formStyle = { padding: '1em' };

export class SimpleForm extends Component {
    handleSubmitWithRedirect = (redirect = this.props.redirect) =>
        this.props.handleSubmit(values => this.props.save(values, redirect));

    render() {
        const {
            basePath,
            children,
            invalid,
            childrenFilter = () => {
                return true;
            },
            record,
            resource,
            submitOnEnter,
            toolbar,
            version,
            style,
            formStyle
        } = this.props;

        return (
            <div style={this.props.style}>
              <form className="simple-form">
                  <div style={formStyle} key={version}>
                      {Children.map(
                          children,
                          input =>
                              input && childrenFilter(resource, input) ? (
                                  <FormInput
                                      basePath={basePath}
                                      input={input}
                                      record={record}
                                      resource={resource}
                                  />
                              ) : null
                      )}
                  </div>
                  {toolbar &&
                      React.cloneElement(toolbar, {
                          handleSubmitWithRedirect: this.handleSubmitWithRedirect,
                          invalid,
                          submitOnEnter,
                      })}
              </form>
            </div>
        );
    }
}

SimpleForm.propTypes = {
    basePath: PropTypes.string,
    children: PropTypes.node,
    childrenFilter: PropTypes.func,
    defaultValue: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    handleSubmit: PropTypes.func, // passed by redux-form
    invalid: PropTypes.bool,
    record: PropTypes.object,
    resource: PropTypes.string,
    redirect: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    save: PropTypes.func, // the handler defined in the parent, which triggers the REST submission
    submitOnEnter: PropTypes.bool,
    toolbar: PropTypes.element,
    validate: PropTypes.func,
    version: PropTypes.number,
    style: PropTypes.object,
    formStyle: PropTypes.object,
};

SimpleForm.defaultProps = {
    submitOnEnter: true,
    toolbar: <Toolbar />,
};

const enhance = compose(
    connect((state, props) => ({
        initialValues: getDefaultValues(state, props),
    })),
    reduxForm({
        form: 'record-form',
        enableReinitialize: true,
    })
);

export default enhance(SimpleForm);
