import React, { Component } from 'react';
import TimerMixin from 'react-timer-mixin';
import MediaCell from './MediaCell';
import MediaDetailView from './MediaDetailView';
import styles from './styles';
import {
  View,
  Text,
  TextInput,
  ListView,
  ActivityIndicator
} from 'react-native';

var API_URL = 'https://itunes.apple.com/search';
var LOADING = {};
var SearchBar = React.createClass({
  render () {
    return (
      <View style={styles.listview.searchBar}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Search for media on iTunes..."
          returnKeyType="search"
          enablesReturnKeyAutomatically={true}
          onChange={this.props.onSearch}
          style={styles.listview.searchBarInput}
        />
        <ActivityIndicator
          animating={this.props.isLoading}
          style={styles.listview.spinner}
          size="small"
        />
      </View>
    );
  }
})

var resultsCache = {
  dataForQuery: {},
};

var MediaListView = React.createClass({
  mixins: [TimerMixin],
  timeoutID: (null: any),

  _urlForQuery (query) {
    return query.length > 2 ? API_URL + '?media=movie&term=' + encodeURIComponent(query) : null;
  },

  getInitialState () {
    return {
      isLoading: false,
      query: '',
      resultsData: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 != row2
      }),
    };
  },

  componentDidMount () {
    this.searchMedia('mission impossible');
  },

  getDataSource (mediaItems: Array<any>): ListView.DataSource  {
    return this.state.resultsData.cloneWithRows(mediaItems);
  },

  searchMedia (query) {
    this.timeoutID = null;
    this.setState({ query: query });
    
    var cachedResultsForQuery = resultsCache.dataForQuery[query]

    if(cachedResultsForQuery) {
      if (!LOADING[query]) {
        this.setState({
          isLoading: false,
          resultsData: this.getDataSource(cachedResultsForQuery),
        });
      } else {
        this.setState({ isLoading: true });
      }
    } else {
      LOADING[query] = true;
      resultsCache.dataForQuery[query] = null;

      var queryURL = this._urlForQuery(query);
      if (!queryURL) return;

      this.setState({ isLoading: true })

      fetch(queryURL)
        .then(response => response.json())
        .catch((error) => {
          LOADING[query] = false;
          this.setState({ 
            isLoading: false,
            resultsData: this.getDataSource([]),
          })

          resultsCache.dataForQuery[query] = undefined;
        })
        .then((responseData) => {
          return responseData.results.filter((e) => e.wrapperType !== 'collection');
        })
        .then((responseData) => {
          LOADING[query] = false;
          resultsCache.dataForQuery[query] = responseData;

          this.setState({ 
            isLoading: false,
            resultsData: this.getDataSource(resultsCache.dataForQuery[query])
          });
        });
    }
  },

  renderRow (media, sectionID, rowID, highlightRowFunction) {
    return (
      <MediaCell
        media={media}
        onSelect={() => this.selectMediaItem(media)}
        onHighlight={() => highlightRowFunction(sectionID, rowID)}
        onDeHighlight={() => highlightRowFunction(null, null)}
      />
    )
  },

  selectMediaItem (mediaItem) {
    this.props.navigator.push({
      title: 'Media Details',
      component: MediaDetailView,
      passProps: {
        mediaItem
      }
    });
  },

  renderSeparator (sectionID, rowID, adjacentRowHighlighted) {
    return (
      <View 
        key={'SEP_' + sectionID + '_' + rowID}
        style={[styles.listview.rowSeparator, adjacentRowHighlighted && styles.listview.rowSeparatorHighlighted]}
      />
    )
  },

  render() {
    var content = null;
    if (this.state.resultsData.getRowCount() === 0) {
      var text = '';

      if (!this.state.isLoading && this.state.query) {
        text = 'No movies found for "' + this.state.query + '"';
      } else if(!this.state.isLoading) {
        text = 'No movies found';
      }

      content = 
        <View style={styles.listview.emptyList}>
          <Text style={styles.listview.emptyListText}>{text}</Text>
        </View>
    } else {
      content = <ListView
        dataSource={this.state.resultsData}
        renderRow={this.renderRow}
        renderSeparator={this.renderSeparator}
        automaticallyAdjustContentInsets={false}
        keyboardDismissMode='on-drag'
      />
    }

    return (
      <View style={styles.global.content}>
        <SearchBar
          isLoading={this.state.isLoading}
          onSearch={(event) => {
            var searchString = event.nativeEvent.text;
            this.clearTimeout(this.timeoutID);
            this.timeoutID = this.setTimeout(() => this.searchMedia(searchString), 250);
          }}
        />
        <View style={[styles.listview.rowSeparator, {marginLeft: 0}]} />
        {content}
      </View>
    );
  }
});

export default MediaListView;