import React from 'react';
import { CardTitle } from 'material-ui/Card';
import withWidth from 'material-ui/utils/withWidth';
import AppBarMobile from './AppBarMobile';

const ViewTitle = ({ title, width, style }) =>
    width === 1 ? (
        <AppBarMobile title={title} />
    ) : (
        <h1 className="title" style={style}>{title}</h1>
    );

export default withWidth()(ViewTitle);
