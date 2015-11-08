/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './SearchFiltersArea.css';
import withViewport from '../../decorators/withViewport';
import withStyles from '../../decorators/withStyles';

@withStyles(styles)
class SearchFiltersArea extends Component {

  render() {
    var styles = {
      width: this.props.width,
      height: this.props.height,
      flex: this.props.flex
    };

    return (
      <div className="SearchFiltersArea" style={styles}>
        Search results
      </div>
    );
  }

}

export default SearchFiltersArea;
