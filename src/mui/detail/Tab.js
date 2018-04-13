import React from 'react';
import Labeled from '../input/Labeled';

const Tab = ({ label, icon, children, ...rest }) => {
    return (
        <div>
            {React.Children.map(
                children,
                field =>
                  field ? (
                    <div key={field.props.source}>
                        {field.props.addLabel ? (
                            <Labeled
                                {...rest}
                                label={field.props.label}
                                source={field.props.source}
                            >
                                {field}
                            </Labeled>
                        ) : typeof field.type === 'string' ? (
                            field
                        ) : (
                            React.cloneElement(field, rest)
                        )}
                    </div>
                  ) : null
            )}
        </div>
    );
};

export default Tab;
