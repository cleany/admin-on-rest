import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash.get';
import pure from 'recompose/pure';
import Chip from 'material-ui/Chip';
import compose from 'recompose/compose';
import translate from '../../i18n/translate';

const ChipField = ({
    source,
    record = {},
    elStyle = { margin: 4 },
    translate,
    translationPath,
    value,
}) => {
    if (translationPath) {
        return (
            <Chip style={elStyle}>
                {translate(
                    `${translationPath}.${value ? value : get(record, source)}`
                )}
            </Chip>
        );
    }

    return <Chip style={elStyle}>{value ? value : get(record, source)}</Chip>;
};

ChipField.propTypes = {
    addLabel: PropTypes.bool,
    elStyle: PropTypes.object,
    label: PropTypes.string,
    source: PropTypes.string.isRequired,
    record: PropTypes.object,
    translationPath: PropTypes.string,
    translate: PropTypes.func,
    value: PropTypes.string,
};

const enhance = compose(pure, translate);

const EnhancedChipField = enhance(ChipField);

EnhancedChipField.defaultProps = {
    addLabel: true,
    translationPath: '',
};

export default EnhancedChipField;
