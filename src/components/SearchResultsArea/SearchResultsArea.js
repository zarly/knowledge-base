/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './SearchResultsArea.css';
import withViewport from '../../decorators/withViewport';
import withStyles from '../../decorators/withStyles';
import SearchBar from '../SearchBar';

@withStyles(styles)
class SearchResultsArea extends Component {

  onSearchQueryChanged (input, resolve) {
    resolve([input]);
  }

  render() {
    var styles = {
      width: this.props.width,
      height: this.props.height,
      flex: this.props.flex
    };

    return (
      <div className="SearchResultsArea" style={styles}>
        Search results
        <SearchBar onChange={this.onSearchQueryChanged} />
      </div>
    );
  }

}

export default SearchResultsArea;
