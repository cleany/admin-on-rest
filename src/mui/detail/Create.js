import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card } from 'material-ui/Card';
import compose from 'recompose/compose';
import inflection from 'inflection';
import withWidth from 'material-ui/utils/withWidth';
import ViewTitle from '../layout/ViewTitle';
import Title from '../layout/Title';
import { crudCreate as crudCreateAction } from '../../actions/dataActions';
import DefaultActions from './CreateActions';
import translate from '../../i18n/translate';
import withPermissionsFilteredChildren from '../../auth/withPermissionsFilteredChildren';

const styles = {
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

class Create extends Component {
    getBasePath() {
        const { location } = this.props;
        return location.pathname
            .split('/')
            .slice(0, -1)
            .join('/');
    }

    defaultRedirectRoute() {
        const { hasShow, hasEdit } = this.props;
        if (hasEdit) return 'edit';
        if (hasShow) return 'show';
        return 'list';
    }

    save = (record, redirect) => {
        this.props.crudCreate(
            this.props.resource,
            record,
            this.props.basePath ? this.props.basePath : this.getBasePath(),
            redirect
        );
    };

    render() {
        const {
            actions,
            children,
            isLoading,
            resource,
            title,
            translate,
            record,
            hasList,
            width,
        } = this.props;

        if (!children) return null;
        const basePath = this.getBasePath();

        const resourceName = translate(`resources.${resource}.name`, {
            smart_count: 1,
            _: inflection.humanize(inflection.singularize(resource)),
        });
        const defaultTitle = translate('aor.page.create', {
            name: `${resourceName}`,
        });
        const titleElement = (
            <Title title={title} defaultTitle={defaultTitle} />
        );

        return (
            <div className="create-page" style={{ opacity: isLoading ? 0.8 : 1 }}>
              <div style={styles.header}>
                <div style={width === 1 ? styles.mobile : null}>
                  <a href={`#/${this.props.resource}`} style={styles.breadcrumb}>
                    {`${this.props.resource} / `}
                  </a>
                  <ViewTitle title={titleElement} style={styles.title}/>
                </div>
                <div>
                  {actions &&
                      React.cloneElement(actions, {
                          basePath,
                          resource,
                          hasList,
                      })}
                </div>
              </div>
                {React.cloneElement(children, {
                      save: this.save,
                      resource,
                      basePath,
                      record,
                      translate,
                      redirect:
                          typeof children.props.redirect === 'undefined'
                              ? this.defaultRedirectRoute()
                              : children.props.redirect,
                  })}
            </div>
        );
    }
}

Create.propTypes = {
    actions: PropTypes.element,
    children: PropTypes.element,
    crudCreate: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired,
    resource: PropTypes.string.isRequired,
    title: PropTypes.any,
    translate: PropTypes.func.isRequired,
    record: PropTypes.object,
    hasList: PropTypes.bool,
    width: PropTypes.number,
};

Create.defaultProps = {
    record: {},
};

function mapStateToProps(state) {
    return {
        isLoading: state.admin.loading > 0,
    };
}

const enhance = compose(
    connect(mapStateToProps, { crudCreate: crudCreateAction }),
    withWidth(),
    translate,
    withPermissionsFilteredChildren
);

export default enhance(Create);
