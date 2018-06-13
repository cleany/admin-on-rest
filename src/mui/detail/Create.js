import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import inflection from 'inflection';
import Breadcrumb from '../layout/Breadcrumb';
import ViewTitle from '../layout/ViewTitle';
import Title from '../layout/Title';
import { crudCreate as crudCreateAction } from '../../actions/dataActions';
import translate from '../../i18n/translate';
import withPermissionsFilteredChildren from '../../auth/withPermissionsFilteredChildren';
import { defaultStyles } from '../defaultStyles';

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
            actions = null,
            children,
            resource,
            title,
            translate,
            record,
            hasList,
            styles = defaultStyles,
            displayBreadcrumb = true,
            displayTitle = true,
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
            <div className="create-page">
                <div style={styles.header}>
                    <div>
                        <Breadcrumb
                            data={record}
                            display={displayBreadcrumb}
                            resource={resource}
                            styles={styles.breadcrumb}
                            view="create"
                        />
                        {displayTitle ? (
                            <ViewTitle
                                title={titleElement}
                                style={styles.title}
                            />
                        ) : null}
                    </div>
                    <div>
                        {actions &&
                            React.cloneElement(actions, {
                                basePath,
                                record,
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
    location: PropTypes.object.isRequired,
    resource: PropTypes.string.isRequired,
    title: PropTypes.any,
    translate: PropTypes.func.isRequired,
    record: PropTypes.object,
    hasList: PropTypes.bool,
    styles: PropTypes.object,
    displayBreadcrumb: PropTypes.bool,
    displayTitle: PropTypes.bool,
};

Create.defaultProps = {
    record: {},
};

const enhance = compose(
    connect(null, { crudCreate: crudCreateAction }),
    translate,
    withPermissionsFilteredChildren
);

export default enhance(Create);
