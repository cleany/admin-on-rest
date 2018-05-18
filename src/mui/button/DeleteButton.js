import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import linkToRecord from '../../util/linkToRecord';
import translate from '../../i18n/translate';

const deleteStyle = {
    bg: '#D63A38',
    bgHover: '#A32C2B',
    label: '#FFFFFF',
};

const DeleteButton = ({
    basePath = '',
    label = 'aor.action.delete',
    record = {},
    translate,
}) => (
    <FlatButton
        label={label && translate(label)}
        onClick={event => {
            event.stopPropagation();
        }}
        containerElement={
            <Link to={`${linkToRecord(basePath, record.id)}/delete`} />
        }
        backgroundColor={deleteStyle.bg}
        hoverColor={deleteStyle.bgHover}
        labelStyle={{
            color: deleteStyle.label,
            fontSize: 12,
        }}
    />
);

DeleteButton.propTypes = {
    basePath: PropTypes.string,
    label: PropTypes.string,
    record: PropTypes.object,
    translate: PropTypes.func.isRequired,
};

export default translate(DeleteButton);
