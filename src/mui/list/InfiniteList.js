import React, { Component } from 'react';
import { connect } from 'react-redux';
import { parse, stringify } from 'query-string';
import { push as pushAction } from 'react-router-redux';
import { Card, CardText } from 'material-ui/Card';
import compose from 'recompose/compose';
import { createSelector } from 'reselect';
import inflection from 'inflection';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import autoprefixer from 'material-ui/utils/autoprefixer';
import queryReducer, { SET_SORT, INC_PAGE, SET_PAGE, SET_FILTER, SORT_DESC } from '../../reducer/resource/list/queryReducer';
import ViewTitle from '../layout/ViewTitle';
import Title from '../layout/Title';
import DefaultPagination from './Pagination';
import DefaultActions from './Actions';
import { crudGetList as crudGetListAction } from '../../actions/dataActions';
import { changeListParams as changeListParamsAction } from '../../actions/listActions';
import translate from '../../i18n/translate';
import removeKey from '../../util/removeKey';
import defaultTheme from '../defaultTheme';
import InfiniteScroll from 'react-infinite-scroller';
import LinearProgress from 'material-ui/LinearProgress';
import { List } from './List';


const styles = {
    noResults: { padding: 20 },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
    },
};

export class InfiniteList extends List {

  componentDidMount() {
      this.updateData();
      if (Object.keys(this.props.query).length > 0) {
          this.props.query.page = 0;
          this.props.changeListParams(this.props.resource, this.props.query);
      }
  }

  getQuery() {
      const query = super.getQuery()
      query.page = this.props.params.page;
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
      const pagination = { page: parseInt(page, 10), perPage: parseInt(perPage, 10) };
      const permanentFilter = this.props.filter;
      this.props.crudGetList(this.props.resource, pagination, { field: sort, order }, { ...filter, ...permanentFilter }, false, true);
  }

  getNextPage() {
      this.changeParams({type: 'INC_PAGE'})
  }

  render() {
      const { filters, pagination = <DefaultPagination />, actions = <DefaultActions />, resource, hasCreate, title, data, ids, total, children, isLoading, translate, theme } = this.props;
      const { key } = this.state;
      const query = this.getQuery();
      const filterValues = query.filter;
      const basePath = this.props.location.pathname;
      const loader = <LinearProgress mode="indeterminate" />;
      const resourceName = translate(`resources.${resource}.name`, {
          smart_count: 2,
          _: inflection.humanize(inflection.pluralize(resource)),
      });
      const defaultTitle = translate('aor.page.list', { name: `${resourceName}` });
      const titleElement = <Title title={title} defaultTitle={defaultTitle} />;
      const muiTheme = getMuiTheme(theme);
      const prefix = autoprefixer(muiTheme);

      return (
          <div className="list-page">
              <Card style={{ opacity: isLoading ? 0.8 : 1 }}>
                  <div style={prefix(styles.header)} >
                      <ViewTitle title={titleElement} />
                      {actions && React.cloneElement(actions, {
                          resource,
                          filters,
                          filterValues,
                          basePath,
                          hasCreate,
                          displayedFilters: this.state,
                          showFilter: this.showFilter,
                          refresh: this.refresh,
                          theme,
                      })}
                  </div>
                  {filters && React.cloneElement(filters, {
                      resource,
                      hideFilter: this.hideFilter,
                      filterValues,
                      displayedFilters: this.state,
                      setFilters: this.setFilters,
                      context: 'form',
                  })}
                  <InfiniteScroll
                    pageStart={1}
                    initialLoad={true}
                    loadMore={this.getNextPage.bind(this)}
                    hasMore={this.props.hasMore}
                    loader={loader}
                  >
                  { isLoading || total > 0 ?
                    <div key={key} className='list-item' style={prefix(styles.listItem)}>
                      {children && React.cloneElement(children, {
                        resource,
                        ids,
                        data,
                        currentSort: { field: query.sort, order: query.order },
                        basePath,
                        isLoading,
                        setSort: this.setSort,
                      })}
                    </div>
                    :
                    <CardText style={styles.noResults}>{translate('aor.navigation.no_results')}</CardText>
                  }
                  </InfiniteScroll>
              </Card>
          </div>
      );
  }
}

const getLocationSearch = props => props.location.search;
const getQuery = createSelector(
    getLocationSearch,
    (locationSearch) => {
        const query = parse(locationSearch);
        if (query.filter && typeof query.filter === 'string') {
            query.filter = JSON.parse(query.filter);
        }
        return query;
    },
);

function mapStateToProps(state, props) {
    const resourceState = state.admin[props.resource];
    return {
        query: getQuery(props),
        params: resourceState.list.params,
        ids: resourceState.list.ids,
        total: resourceState.list.total,
        data: resourceState.data,
        hasMore: resourceState.list.ids.length < resourceState.list.total,
        isLoading: state.admin.loading > 0,
        filterValues: resourceState.list.params.filter,
    };
}

const enhance = compose(
    connect(
        mapStateToProps,
        {
            crudGetList: crudGetListAction,
            changeListParams: changeListParamsAction,
            push: pushAction,
        },
    ),
    translate,
);

export default enhance(InfiniteList);
