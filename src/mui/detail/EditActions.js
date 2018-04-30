import React from 'react';
import { CardActions } from 'material-ui/Card';
import { DeleteButton } from '../button';

const cardActionStyle = {
    zIndex: 2,
    display: 'inline-block',
    float: 'right',
};

const EditActions = ({ basePath, data, hasDelete, hasShow, hasList }) => (
    <CardActions style={cardActionStyle}>
        {hasDelete && <DeleteButton basePath={basePath} record={data} />}
    </CardActions>
);

export default EditActions;
