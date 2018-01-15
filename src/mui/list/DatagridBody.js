import React from 'react';
import PropTypes from 'prop-types';
import shouldUpdate from 'recompose/shouldUpdate';
import { TableBody, TableRow } from 'material-ui/Table';
import DatagridCell from './DatagridCell';

const DatagridBody = ({
    resource,
    children,
    childrenFilter = () => {
        return true;
    },
    ids,
    isLoading,
    data,
    basePath,
    styles,
    rowStyle,
    rowClickable,
    options,
    rowOptions,
    ...rest
}) => (
    <TableBody
        displayRowCheckbox={false}
        className="datagrid-body"
        showRowHover={true}
        {...rest}
        {...options}
    >
        {ids.map((id, rowIndex) => {
            return (
                <TableRow
                    style={rowStyle ? rowStyle(data[id], rowIndex) : styles.tr}
                    key={id}
                    selectable={false}
                    {...rowOptions}
                >
                    {React.Children.map(children, (field, index) => {
                        if (childrenFilter(resource, field)) {
                            return field ? (
                                <DatagridCell
                                    key={`${id}-${field.props.source || index}`}
                                    className={`column-${field.props.source}`}
                                    record={data[id]}
                                    defaultStyle={
                                        index === 0 ? (
                                            styles.cell['td:first-child']
                                        ) : (
                                            styles.cell.td
                                        )
                                    }
                                    clickable={rowClickable}
                                    {...{ field, basePath, resource }}
                                />
                            ) : null;
                        }
                        return;
                    })}
                </TableRow>
            );
        })}
    </TableBody>
);

DatagridBody.propTypes = {
    ids: PropTypes.arrayOf(PropTypes.any).isRequired,
    isLoading: PropTypes.bool,
    resource: PropTypes.string,
    data: PropTypes.object.isRequired,
    basePath: PropTypes.string,
    options: PropTypes.object,
    rowOptions: PropTypes.object,
    styles: PropTypes.object,
    rowStyle: PropTypes.func,
    childrenFilter: PropTypes.func,
    rowClickable: PropTypes.bool,
};

DatagridBody.defaultProps = {
    data: {},
    ids: [],
};

const PureDatagridBody = shouldUpdate(
    (props, nextProps) => nextProps.isLoading === false
)(DatagridBody);

// trick material-ui Table into thinking this is one of the child type it supports
PureDatagridBody.muiName = 'TableBody';

export default PureDatagridBody;
