import React from 'react';
import { CardActions } from 'material-ui/Card';
import { EditButton, DeleteButton } from '../button';

const cardActionStyle = {
    zIndex: 2,
    display: 'inline-block',
    float: 'right',
};

const ShowActions = ({ basePath, data, hasDelete, hasEdit }) => (
    <CardActions style={cardActionStyle}>
        {hasEdit && <EditButton basePath={basePath} record={data} />}
        {hasDelete && <DeleteButton basePath={basePath} record={data} />}
    </CardActions>
);

export default ShowActions;
