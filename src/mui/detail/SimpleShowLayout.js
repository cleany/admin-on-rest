import React, { Children } from 'react';
import PropTypes from 'prop-types';
import Labeled from '../input/Labeled';
import get from 'lodash.get';

const defaultStyle = { padding: '0 1em 1em 1em' };
const SimpleShowLayout = ({
    basePath,
    children = [],
    childrenFilter = () => {
        return true;
    },
    record,
    resource,
    style = defaultStyle,
    version,
}) => (
    <div style={style} key={version}>
        {Children.map(children, field => {
            if (!field) {
                return;
            }
            if (childrenFilter(resource, field)) {
                const content = get(record, field.props.source);
                if (!content && field.props.autoHideLabel) {
                    return;
                }
            }
            return (
                <div
                    key={field.props.source}
                    style={field.props.style}
                    className={`aor-field aor-field-${field.props.source}`}
                >
                    {field.props.addLabel ? (
                        <Labeled
                            record={record}
                            resource={resource}
                            basePath={basePath}
                            label={field.props.label}
                            source={field.props.source}
                            disabled={false}
                        >
                            {field}
                        </Labeled>
                    ) : typeof field.type === 'string' ? (
                        field
                    ) : (
                        React.cloneElement(field, {
                            record,
                            resource,
                            basePath,
                        })
                    )}
                </div>
            );
        })}
    </div>
);

SimpleShowLayout.propTypes = {
    basePath: PropTypes.string,
    children: PropTypes.node,
    childrenFilter: PropTypes.func,
    record: PropTypes.object,
    resource: PropTypes.string,
    style: PropTypes.object,
    version: PropTypes.number,
};

export default SimpleShowLayout;
