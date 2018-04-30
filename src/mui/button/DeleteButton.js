import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import linkToRecord from '../../util/linkToRecord';
import translate from '../../i18n/translate';

const deleteStyle = {
  bg: '#D63A38',
  label: "#FFFFFF",
};

const DeleteButton = ({
    basePath = '',
    label = 'aor.action.delete',
    record = {},
    translate,
}) => (
    <RaisedButton
        label={label && translate(label)}
        onClick={event => {
            event.stopPropagation();
        }}
        containerElement={
            <Link to={`${linkToRecord(basePath, record.id)}/delete`} />
        }
        backgroundColor={deleteStyle.bg}
        labelColor={deleteStyle.label}
    />
);

DeleteButton.propTypes = {
    basePath: PropTypes.string,
    label: PropTypes.string,
    record: PropTypes.object,
    translate: PropTypes.func.isRequired,
};

export default translate(DeleteButton);
