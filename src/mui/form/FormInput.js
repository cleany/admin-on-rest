import React from 'react';
import FormField from './FormField';
import Responsive from '../layout/Responsive';

const defaultStyle = {
    minWidth: 'calc(50% - 8px)',
    maxWidth: 'calc(50% - 8px)',
};

const FormInput = ({ input, ...rest }) =>
    input ? (
        <Responsive
            small={
                <div
                    className={`aor-input aor-input-${input.props.source}`}
                    style={{ minWidth: '100%', maxWidth: '100%' }}
                >
                    <FormField input={input} {...rest} />
                </div>
            }
            medium={
                <div
                    className={`aor-input aor-input-${input.props.source}`}
                    style={input.props.style ? input.props.style : defaultStyle}
                >
                    <FormField input={input} {...rest} />
                </div>
            }
        />
    ) : null;

export default FormInput;
