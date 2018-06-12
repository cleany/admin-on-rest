import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import inflection from 'inflection';
import ViewTitle from '../layout/ViewTitle';
import Title from '../layout/Title';
import Breadcrumb from '../layout/Breadcrumb';
import { crudGetOne as crudGetOneAction } from '../../actions/dataActions';
import DefaultActions from './ShowActions';
import translate from '../../i18n/translate';
import withPermissionsFilteredChildren from '../../auth/withPermissionsFilteredChildren';
import { defaultStyles } from '../defaultStyles';

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
            resource,
            hasDelete,
            hasEdit,
            translate,
            version,
            styles = defaultStyles,
            displayBreadcrumb = true,
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
            <div className="show-page aor-show-layout">
                <div style={styles.header}>
                    <div>
                        {displayBreadcrumb && (
                            <Breadcrumb
                                data={data}
                                display={displayBreadcrumb}
                                resource={resource}
                                styles={styles.breadcrumb}
                                view="show"
                            />
                        )}
                        <ViewTitle title={titleElement} style={styles.title} />
                    </div>
                    <div className="aor-show-actions">
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
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    resource: PropTypes.string.isRequired,
    title: PropTypes.any,
    translate: PropTypes.func,
    version: PropTypes.number.isRequired,
    displayBreadcrumb: PropTypes.bool,
};

function mapStateToProps(state, props) {
    return {
        id: decodeURIComponent(props.match.params.id),
        data: state.admin.resources[props.resource]
            ? state.admin.resources[props.resource].data[
                  decodeURIComponent(props.match.params.id)
              ]
            : null,
        version: state.admin.ui.viewVersion,
    };
}

const enhance = compose(
    connect(mapStateToProps, { crudGetOne: crudGetOneAction }),
    translate,
    withPermissionsFilteredChildren
);

export default enhance(Show);
