import React from 'react';
import withWidth from 'material-ui/utils/withWidth';
import FormField from './FormField';

const style = {
  web: {
    flex: '1',
    minWidth: 'calc(50% - 8px)',
    maxWidth: 'calc(50% - 8px)',
  },
  webBis: {
    flex: '1',
    minWidth: 'calc((100% / 7) - 8px)',
    maxWidth: 'calc((100% / 7) - 8px)',
  },
  mobile: {
    flex: '1',
    minWidth: '100%',
    maxWidth: '100%',
  }
}

const FormInput = withWidth()(({ input, width, ...rest }) => {
  return input
      ? <div
        className={`aor-input aor-input-${input.props.source}`}
        style={width === 1 ? style.mobile : input.type.name === 'BooleanInput' ? style.webBis : style.web }
        ><FormField input={input} {...rest} /></div>
      : null;
});


export default FormInput;
