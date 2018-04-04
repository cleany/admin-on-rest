import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Toggle from 'material-ui/Toggle';
import Checkbox from 'material-ui/Checkbox';
import FieldTitle from '../../util/FieldTitle';

const style = {
  box: {
    border: `solid 1px #1F333D`,
    borderRadius: '4px',
    opacity: '.4',
  },
  boxSelected: {
    border: `solid 1px #3CA3DB`,
    borderRadius: '4px',
    opacity: '1',
  },
  label: {
    textAlign: 'center',
    color: '#1F333D',
    float: 'inherit',
    width: '100%',
    textTransform: 'capitalize',
    padding: '.5em 1em',
    fontSize: 14,
    opacity: '.4',
  },
  labelSelected: {
    textAlign: 'center',
    color: '#3CA3DB',
    float: 'inherit',
    width: '100%',
    textTransform: 'capitalize',
    padding: '.5em 1em',
    fontSize: 14,
  },
  icon: {
    display: 'none',
  },
};

class BooleanInput extends Component {
    handleToggle = (event, value) => {
        this.props.input.onChange(value);
    };

    componentDidMount = () => {
        this.props.input.onChange(!!this.props.input.value);
    };

    render() {
        const {
            input,
            isRequired,
            label,
            source,
            elStyle = style,
            resource,
            options,
        } = this.props;
        return (
            <div style={!!input.value ? elStyle.boxSelected : elStyle.box}>
                {/*<Toggle
                    toggled={!!input.value}
                    onToggle={this.handleToggle}
                    labelStyle={styles.label}
                    style={styles.toggle}
                    label={
                        <FieldTitle
                            label={label}
                            source={source}
                            resource={resource}
                            isRequired={isRequired}
                        />
                    }
                    {...options}
                />*/}
                <Checkbox
                  checked={!!input.value}
                  onCheck={this.handleToggle}
                  iconStyle={elStyle.icon}
                  labelStyle={!!input.value
                    ? elStyle.labelSelected
                    : elStyle.label}
                  label={
                    <FieldTitle
                      label={label}
                      source={source}
                      resource={resource}
                      isRequired={isRequired}
                    />
                  }
                  {...options}
                />
            </div>
        );
    }
}

BooleanInput.propTypes = {
    addField: PropTypes.bool.isRequired,
    elStyle: PropTypes.object,
    input: PropTypes.object,
    isRequired: PropTypes.bool,
    label: PropTypes.string,
    resource: PropTypes.string,
    source: PropTypes.string,
    options: PropTypes.object,
};

BooleanInput.defaultProps = {
    addField: true,
    options: {},
};

export default BooleanInput;
