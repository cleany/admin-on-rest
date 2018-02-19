import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { asYouType } from 'libphonenumber-js';

import TextInput from './TextInput';

class asYouTypeIntl extends asYouType {
    process_input(input) {
        super.process_input(input);

        if (!this.format_national_phone_number(input)) {
            return this.parsed_input;
        }

        const intlFormatter = new asYouType();
        return intlFormatter.input(
            `+${this.country_phone_code}${this.national_number}`
        );
    }
}

export const parseInput = number => {
    if (!number) {
        return '';
    }
    return new asYouTypeIntl('FR').input(number);
};

const PhoneInput = props => {
    return (
        <Field
            {...props}
            name={props.source}
            component={TextInput}
            parse={parseInput}
        />
    );
};

PhoneInput.propTypes = {
    elStyle: PropTypes.object,
    isRequired: PropTypes.bool,
    label: PropTypes.string,
    options: PropTypes.object,
    resource: PropTypes.string,
    source: PropTypes.string.isRequired,
};

PhoneInput.defaultProps = {};

export default PhoneInput;
