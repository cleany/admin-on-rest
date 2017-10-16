import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash.get';
import pure from 'recompose/pure';

const EmailField = ({ source, record = {}, elStyle, linkType }) => {
  if (linkType) {
    return (
      <a style={elStyle} href={`mailto:${get(record, source)}`}>
      {get(record, source)}
      </a>
    );
  }
  return (
    <span style={elStyle}>{get(record, source)}</span>
  );
}

EmailField.propTypes = {
  addLabel: PropTypes.bool,
  elStyle: PropTypes.object,
  label: PropTypes.string,
  record: PropTypes.object,
  source: PropTypes.string.isRequired,
  linkType: PropTypes.bool,
};

const PureEmailField = pure(EmailField);

PureEmailField.defaultProps = {
  addLabel: true,
  linkType: true,
};

export default PureEmailField;
