import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import FieldTitle from '../../util/FieldTitle';

const DisabledInput = ({
    input: { value },
    label,
    resource,
    source,
    elStyle,
    options,
    labelFixed,
    fullWidth,
}) => (
    <TextField
        value={value}
        floatingLabelFixed={labelFixed}
        floatingLabelText={
            <FieldTitle label={label} source={source} resource={resource} />
        }
        style={elStyle}
        fullWidth={fullWidth}
        disabled
        {...options}
    />
);

DisabledInput.propTypes = {
    label: PropTypes.string,
    record: PropTypes.object,
    resource: PropTypes.string,
    source: PropTypes.string,
    elStyle: PropTypes.object,
    input: PropTypes.object,
    addField: PropTypes.bool.isRequired,
    labelFixed: PropTypes.bool,
    fullWidth: PropTypes.bool,
};

DisabledInput.defaultProps = {
    addField: true,
    labelFixed: true,
    fullWidth: true,
};

export default DisabledInput;
