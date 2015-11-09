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
        <div className="SearchResultsArea-viewingBlock">
          No results here
        </div>
        <div className="SearchResultsArea-addingBlock">
          <textarea style={{flex: 1, height: '100px'}}></textarea>
          <button style={{width: '100px', height: '100px'}}>Add new note</button>
        </div>
      </div>
    );
  }

}

export default SearchResultsArea;
