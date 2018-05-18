import React from 'react';
import FormField from './FormField';

const defaultStyle = {
    minWidth: 'calc(50% - 8px)',
    maxWidth: 'calc(50% - 8px)',
};

const FormInput = ({ input, ...rest }) =>
    input ? (
        <div
            className={`aor-input aor-input-${input.props.source}`}
            style={input.props.style ? input.props.style : defaultStyle}
        >
            <FormField input={input} {...rest} />
        </div>
    ) : null;

export default FormInput;
