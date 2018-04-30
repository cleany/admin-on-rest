import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import linkToRecord from '../../util/linkToRecord';
import translate from '../../i18n/translate';

const CancelButton = ({
    basePath = '',
    label = 'aor.action.cancel',
    record = {},
    translate,
}) => (
    <RaisedButton
        label={label && translate(label)}
        onClick={event => {
            event.stopPropagation();
        }}
        containerElement={
            <Link to={`${basePath}`} />
        }
        style={{
          marginLeft: '16px',
        }}
    />
);

CancelButton.propTypes = {
    basePath: PropTypes.string,
    label: PropTypes.string,
    translate: PropTypes.func.isRequired,
};

export default translate(CancelButton);
