import React from 'react';
import { connect } from 'react-redux';
import { push as pushAction } from 'react-router-redux';
import { Card, CardText } from 'material-ui/Card';
import compose from 'recompose/compose';
import inflection from 'inflection';
import { Paper } from 'material-ui';
import ViewTitle from '../layout/ViewTitle';
import Title from '../layout/Title';
import DefaultActions from './Actions';
import { crudGetList as crudGetListAction } from '../../actions/dataActions';
import { changeListParams as changeListParamsAction } from '../../actions/listActions';
import { refreshView as refreshViewAction } from '../../actions/uiActions';
import translate from '../../i18n/translate';
import withPermissionsFilteredChildren from '../../auth/withPermissionsFilteredChildren';
import InfiniteScroll from 'react-infinite-scroller';
import LinearProgress from 'material-ui/LinearProgress';
import { List, mapStateToProps } from './List';
import { defaultStyles } from '../defaultStyles';

export class InfiniteList extends List {
    state = {};

    componentDidMount() {
        this.updateData();
        if (Object.keys(this.props.query).length > 0) {
            this.props.query.page = 1;
            this.props.changeListParams(this.props.resource, this.props.query);
        }
    }

    componentWillUnmount() {
        this.props.query.page = 1;
        this.props.changeListParams(this.props.resource, this.props.query);
    }

    getQuery() {
        const query =
            Object.keys(this.props.query).length > 0
                ? Object.assign({}, this.props.query, {
                      page: this.props.params.page,
                  })
                : { ...this.props.params };
        if (!query.sort) {
            query.sort = this.props.sort.field;
            query.order = this.props.sort.order;
        }
        if (!query.perPage) {
            query.perPage = this.props.perPage;
        }
        return query;
    }

    updateData(query) {
        const params = query || this.getQuery();
        const { sort, order, page, perPage, filter } = params;
        const pagination = {
            page: parseInt(page, 10),
            perPage: parseInt(perPage, 10),
        };
        const permanentFilter = this.props.filter;
        this.props.crudGetList(
            this.props.resource,
            pagination,
            { field: sort, order },
            { ...filter, ...permanentFilter },
            false,
            true
        );
    }

    getNextPage() {
        if (this.props.hasMore) {
            this.changeParams({ type: 'INC_PAGE' });
        }
    }

    render() {
        const {
            children,
            filters,
            actions = <DefaultActions />,
            resource,
            hasCreate,
            title,
            data,
            ids,
            total,
            isLoading,
            translate,
            theme,
            version,
            styles,
        } = this.props;
        const query = this.getQuery();
        const filterValues = query.filter;
        const basePath = this.getBasePath();
        const loader = <LinearProgress mode="indeterminate" />;
        const resourceName = translate(`resources.${resource}.name`, {
            smart_count: 2,
            _: inflection.humanize(inflection.pluralize(resource)),
        });
        const defaultTitle = translate('aor.page.list', {
            name: `${resourceName}`,
        });
        const titleElement = (
            <Title title={title} defaultTitle={defaultTitle} />
        );
        return (
            <Paper style={{ background: 'transparent' }} zDepth={0}>
                <div>
                    <div style={styles.header}>
                        <ViewTitle title={titleElement} style={styles.title} />
                        <div>
                            {actions &&
                                React.cloneElement(actions, {
                                    resource,
                                    filters,
                                    filterValues,
                                    basePath,
                                    hasCreate,
                                    displayedFilters: this.state,
                                    showFilter: this.showFilter,
                                    theme,
                                    refresh: this.refresh,
                                })}
                        </div>
                    </div>
                    <div>
                        {filters &&
                            React.cloneElement(filters, {
                                resource,
                                hideFilter: this.hideFilter,
                                filterValues,
                                displayedFilters: this.state,
                                setFilters: this.setFilters,
                                context: 'form',
                            })}

                    </div>
                </div>
                <Card style={styles.card}>
                    {isLoading || total > 0 ? (
                        <InfiniteScroll
                            pageStart={1}
                            loadMore={this.getNextPage.bind(this)}
                            hasMore={this.props.hasMore}
                            loader={loader}
                        >
                            <div key={version}>
                                {children &&
                                    React.cloneElement(children, {
                                        resource,
                                        ids,
                                        data,
                                        currentSort: {
                                            field: query.sort,
                                            order: query.order,
                                        },
                                        basePath,
                                        isLoading,
                                        setSort: this.setSort,
                                    })}
                            </div>
                        </InfiniteScroll>
                    ) : (
                        <CardText style={styles.noResults}>
                            {translate('aor.navigation.no_results')}
                        </CardText>
                    )}
                </Card>
            </Paper>
        );
    }
}

const enhance = compose(
    connect(mapStateToProps, {
        crudGetList: crudGetListAction,
        changeListParams: changeListParamsAction,
        push: pushAction,
        refreshView: refreshViewAction,
    }),
    translate,
    withPermissionsFilteredChildren
);

export default enhance(InfiniteList);
