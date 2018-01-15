import React from 'react';
import PropTypes from 'prop-types';
import defaultsDeep from 'lodash.defaultsdeep';
import { TableRowColumn } from 'material-ui/Table';
import { withRouter } from 'react-router';
import linkToRecord from '../../util/linkToRecord';

export const DatagridCell = ({
    className,
    field,
    record,
    basePath,
    resource,
    style,
    defaultStyle,
    history,
    match,
    location,
    staticContext,
    clickable = true,
    ...rest
}) => {
    const computedStyle = defaultsDeep(
        {},
        style,
        field.props.style,
        field.type.defaultProps ? field.type.defaultProps.style : {},
        defaultStyle
    );

    const handleClick = clickable
        ? () => {
              history.push(linkToRecord(basePath, record.id));
          }
        : undefined;

    return (
        <TableRowColumn
            className={className}
            style={Object.assign(computedStyle, { cursor: 'pointer' })}
            {...rest}
            onClick={handleClick}
        >
            {React.cloneElement(field, { record, basePath, resource })}
        </TableRowColumn>
    );
};

DatagridCell.propTypes = {
    field: PropTypes.element,
    record: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    basePath: PropTypes.string,
    resource: PropTypes.string,
    style: PropTypes.object,
    defaultStyle: PropTypes.shape({
        td: PropTypes.object,
        'td:first-child': PropTypes.object,
    }),
    history: PropTypes.object,
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    staticContext: PropTypes.object,
    clickable: PropTypes.bool,
};

export default withRouter(DatagridCell);
