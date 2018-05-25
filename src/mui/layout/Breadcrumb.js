import React, { Component } from 'react';
import PropTypes from 'prop-types';
import inflection from 'inflection';
import translate from '../../i18n/translate';
import BreadcrumbLink from './BreadcrumbLink';

class Breadcrumb extends Component {
    render() {
        const { data, display, resource, view, translate, styles } = this.props;
        const resourceName = translate(`resources.${resource}.name`, {
            smart_count: 2,
            _: inflection.humanize(inflection.singularize(resource)),
        });
        if (!display) return null;

        return (
            <div className="breadcrumb aor-no-print">
                <BreadcrumbLink
                    url={`#/${resource}`}
                    text={`${resourceName} /`}
                    styles={styles}
                />
                {view === 'edit' &&
                data &&
                (data.name || data.fullname) && (
                    <BreadcrumbLink
                        url={`#/${resource}/${data.id}`}
                        text={
                            data.name ? (
                                ` ${data.name} /`
                            ) : (
                                ` ${data.fullname} /`
                            )
                        }
                        styles={styles}
                    />
                )}
            </div>
        );
    }
}

Breadcrumb.propTypes = {
    data: PropTypes.object,
    display: PropTypes.bool.isRequired,
    resource: PropTypes.string.isRequired,
    view: PropTypes.string.isRequired,
    translate: PropTypes.func,
    styles: PropTypes.object,
};

export default translate(Breadcrumb);
