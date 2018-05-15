import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import linkToRecord from '../../util/linkToRecord';
import translate from '../../i18n/translate';

const CancelButton = ({
    basePath = '',
    label = 'aor.action.cancel',
    record = {},
    translate,
}) => (
    <FlatButton
        label={label && translate(label)}
        onClick={event => {
            event.stopPropagation();
        }}
        containerElement={
            <Link to={`${basePath}`} />
        }
        style={{
          marginLeft: '10px',
        }}
    />
);

CancelButton.propTypes = {
    basePath: PropTypes.string,
    label: PropTypes.string,
    translate: PropTypes.func.isRequired,
};

export default translate(CancelButton);
