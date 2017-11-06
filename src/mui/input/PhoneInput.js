import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { asYouType } from 'libphonenumber-js';

import TextInput from './TextInput';

export const parseInput = number => {
    if (!number) {
        return '';
    }

    if (number.charAt(0) === '0') {
        const rest = number.slice(1);
        number = `+33${rest}`;
    }

    const parsedNumber = new asYouType('FR').input(number);
    return parsedNumber;
};

const PhoneInput = ({ label, source }) => {
    return (
        <Field
            name={source}
            label={label}
            component={TextInput}
            parse={parseInput}
        />
    );
};

PhoneInput.propTypes = {
    label: PropTypes.string,
    source: PropTypes.string.isRequired,
};

PhoneInput.defaultProps = {
    label: '',
};

export default PhoneInput;
