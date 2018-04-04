import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card } from 'material-ui/Card';
import compose from 'recompose/compose';
import inflection from 'inflection';
import withWidth from 'material-ui/utils/withWidth';
import ViewTitle from '../layout/ViewTitle';
import Title from '../layout/Title';
import { crudGetOne as crudGetOneAction } from '../../actions/dataActions';
import DefaultActions from './ShowActions';
import translate from '../../i18n/translate';
import withPermissionsFilteredChildren from '../../auth/withPermissionsFilteredChildren';

export const styles = {
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '22px',
      fontWeight: 600,
      color: '#3CA3DB',
      margin: '8px 0 16px',
    },
    breadcrumb: {
      fontSize: '12px',
      color: 'rgba(31, 51, 61, 0.4)',
      textDecoration: 'none',
      fontFamily: 'Nunito, sans-serif',
      fontWeight: 700,
      textTransform: 'capitalize',
    },
    mobile: {
      padding: '0 1em',
    },
};

export class Show extends Component {
    componentDidMount() {
        this.updateData();
    }

    componentWillReceiveProps(nextProps) {
        if (
            this.props.id !== nextProps.id ||
            nextProps.version !== this.props.version
        ) {
            this.updateData(nextProps.resource, nextProps.id);
        }
    }

    getBasePath() {
        const { location } = this.props;
        return location.pathname
            .split('/')
            .slice(0, -1)
            .join('/');
    }

    updateData(resource = this.props.resource, id = this.props.id) {
        this.props.crudGetOne(resource, id, this.getBasePath());
    }

    render() {
        const {
            actions = <DefaultActions />,
            title,
            children,
            id,
            data,
            isLoading,
            resource,
            hasDelete,
            hasEdit,
            translate,
            version,
            width,
        } = this.props;

        if (!children) return null;
        const basePath = this.getBasePath();

        const resourceName = translate(`resources.${resource}.name`, {
            smart_count: 1,
            _: inflection.humanize(inflection.singularize(resource)),
        });
        const defaultTitle = translate('aor.page.show', {
            name: `${resourceName}`,
            id,
            data,
        });
        const titleElement = data ? (
            <Title title={title} record={data} defaultTitle={defaultTitle} />
        ) : (
            ''
        );

        return (
            <div style={{ opacity: isLoading ? 0.8 : 1 }}>
              <div style={styles.header}>
                <div style={width === 1 ? styles.mobile : null}>
                  <a href={`#/${this.props.resource}`} style={styles.breadcrumb}>
                    {`${this.props.resource} /`}
                  </a>
                  <ViewTitle title={titleElement} style={styles.title}/>
                </div>
                <div>
                  {actions &&
                      React.cloneElement(actions, {
                          basePath,
                          data,
                          hasDelete,
                          hasEdit,
                          refresh: this.refresh,
                          resource,
                      })}
                </div>
              </div>

              {data &&
                  React.cloneElement(children, {
                      resource,
                      basePath,
                      record: data,
                      translate,
                      version,
                  })}
            </div>
        );
    }
}

Show.propTypes = {
    actions: PropTypes.element,
    children: PropTypes.element,
    crudGetOne: PropTypes.func.isRequired,
    data: PropTypes.object,
    hasList: PropTypes.bool,
    hasDelete: PropTypes.bool,
    hasEdit: PropTypes.bool,
    id: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    resource: PropTypes.string.isRequired,
    title: PropTypes.any,
    translate: PropTypes.func,
    version: PropTypes.number.isRequired,
    width: PropTypes.number,
};

function mapStateToProps(state, props) {
    return {
        id: decodeURIComponent(props.match.params.id),
        data: state.admin.resources[props.resource]
            ? state.admin.resources[props.resource].data[
                  decodeURIComponent(props.match.params.id)
              ]
            : null,
        isLoading: state.admin.loading > 0,
        version: state.admin.ui.viewVersion,
    };
}

const enhance = compose(
    connect(mapStateToProps, { crudGetOne: crudGetOneAction }),
    withWidth(),
    translate,
    withPermissionsFilteredChildren
);

export default enhance(Show);
