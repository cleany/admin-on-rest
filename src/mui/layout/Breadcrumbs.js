import React, { Component } from 'react';
import PropTypes from 'prop-types';
import inflection from 'inflection';
import translate from '../../i18n/translate';
import Breadcrumb from '../layout/Breadcrumb';

class Breadcrumbs extends Component {
  render() {
    const {
      data,
      display,
      resource,
      view,
      translate,
      styles,
    } = this.props;
    const resourceName = translate(
        `resources.${resource}.name`,
        { smart_count: 2,
        _: inflection.humanize(inflection.singularize(resource)),
    });
    if (!display) return null;

    return (
        <div className="breadcrumbs aor-no-print">
            <Breadcrumb
              url={`#/${resource}`}
              text={`${resourceName} /`}
              styles={styles}
            />
            {view === 'edit' && data &&
                <Breadcrumb
                  url={`#/${resource}/${data.id}`}
                  text={
                    !!data.account_name
                    ? (` ${data.account_name} / `)
                    : (!!data.name ? ` ${data.name} /` : ` ${data.fullname} /`)
                  }
                  styles={styles}
                />
            }
        </div>
    );
  }
}

Breadcrumbs.propTypes = {
    data: PropTypes.object,
    display: PropTypes.bool.isRequired,
    resource: PropTypes.string.isRequired,
    view: PropTypes.string.isRequired,
    translate: PropTypes.func,
    styles: PropTypes.object,
};

export default translate(Breadcrumbs);
