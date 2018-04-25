import React from 'react';
import PropTypes from 'prop-types';
import defaultsDeep from 'lodash.defaultsdeep';
import shouldUpdate from 'recompose/shouldUpdate';
import { TableHeaderColumn } from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import ContentSort from 'material-ui/svg-icons/content/sort';
import FieldTitle from '../../util/FieldTitle';

export const DatagridHeaderCell = ({
    field,
    defaultStyle,
    currentSort,
    updateSort,
    resource,
    styles,
}) => {
    const style = defaultsDeep(
        {},
        field.props.headerStyle,
        field.type.defaultProps ? field.type.defaultProps.headerStyle : {},
        defaultStyle
    );
    return (
        <TableHeaderColumn style={style}>
            <FlatButton
                labelPosition="before"
                onClick={
                    field.props.sortable !== false && field.props.source
                    ? updateSort
                    : null
                }
                data-sort={
                    field.props.sortable !== false && field.props.source
                    ? field.props.source
                    : null
                }
                label={
                    <span style={styles.nonSortableLabel}>
                        <FieldTitle
                            label={field.props.label}
                            source={field.props.source}
                            resource={resource}
                        />
                    </span>
                }
                icon={
                    field.props.sortable !== false &&
                    field.props.source === currentSort.field ? (
                        <ContentSort
                            style={
                              currentSort.order === 'ASC'
                              ? ({ transform: 'rotate(180deg)', opacity:.3 })
                              : ({ opacity:.3 })
                            }
                        />
                    ) : ( false )
                }
                style={
                  field.props.sortable !== false
                  ? styles.sortButton
                  : styles.nonSortButton
                }
                labelStyle={styles.label}
                disableTouchRipple
                disabled={
                  field.props.sortable === false
                  || !field.props.source
                }
            />
        </TableHeaderColumn>
    );
};

DatagridHeaderCell.propTypes = {
    field: PropTypes.element,
    defaultStyle: PropTypes.shape({
        th: PropTypes.object,
        'th:first-child': PropTypes.object,
        sortButton: PropTypes.object,
        nonSortableLabel: PropTypes.object,
    }),
    currentSort: PropTypes.shape({
        sort: PropTypes.string,
        order: PropTypes.string,
    }),
    isSorting: PropTypes.bool,
    sortable: PropTypes.bool,
    resource: PropTypes.string,
    updateSort: PropTypes.func.isRequired,
    styles: PropTypes.object,
};

export default shouldUpdate(
    (props, nextProps) =>
        props.isSorting !== nextProps.isSorting ||
        (nextProps.isSorting &&
            props.currentSort.order !== nextProps.currentSort.order)
)(DatagridHeaderCell);
