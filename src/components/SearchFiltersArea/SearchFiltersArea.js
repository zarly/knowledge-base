/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './SearchFiltersArea.css';
import withViewport from '../../decorators/withViewport';
import withStyles from '../../decorators/withStyles';
import SearchBar from '../SearchBar';

@withStyles(styles)
class SearchFiltersArea extends Component {

  state = {
    tags: ['tag-1', 'tag-2']
  };

  onSearchQueryChanged (input, resolve) {
    resolve([input]);
  }

  onSearchQuerySubmit (query) {
    this.state.tags.push(query);
    this.render();
  }

  render() {
    var styles = {
      width: this.props.width,
      height: this.props.height,
      flex: this.props.flex
    };

    return (
      <div className="SearchFiltersArea" style={styles}>
        <SearchBar onChange={this.onSearchQueryChanged.bind(this)} onSubmit={this.onSearchQuerySubmit.bind(this)} />
        Tags: {this.state.tags.join(', ')}
      </div>
    );
  }

}

export default SearchFiltersArea;
