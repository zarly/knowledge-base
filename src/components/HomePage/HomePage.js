/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './HomePage.css';
import withStyles from '../../decorators/withStyles';
import ControlMenuArea from '../ControlMenuArea';
import SearchFiltersArea from '../SearchFiltersArea';
import SearchResultsArea from '../SearchResultsArea';

@withStyles(styles)
class HomePage extends Component {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  render() {
    let width = this.props.width || 1000;

    const title = 'Home Page';
    this.context.onSetTitle(title);
    return (
      <div className="HomePage">
        <div className="HomePage-container">
          <ControlMenuArea flex="1" />
          <SearchFiltersArea flex="1.618" />
          <SearchResultsArea flex="2.618" />
        </div>
      </div>
    );
  }

}

export default HomePage;
