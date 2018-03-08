import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash.get';
import pure from 'recompose/pure';

const MultipleTextField = ({ source, record = {}, elStyle }) => {
    const item = source.map((s) => {
      return <div style={elStyle}>{get(record, s)}</div>;
    });
    return <div>{item}</div>;
};

MultipleTextField.propTypes = {
    addLabel: PropTypes.bool,
    elStyle: PropTypes.object,
    label: PropTypes.string,
    record: PropTypes.object,
    source: PropTypes.array.isRequired,
};

const PureMultipleTextField = pure(MultipleTextField);

PureMultipleTextField.defaultProps = {
    addLabel: true,
};

export default PureMultipleTextField;
