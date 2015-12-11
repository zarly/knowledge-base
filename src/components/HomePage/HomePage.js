/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './HomePage.css';
import withStyles from '../../decorators/withStyles';
import ControlMenuArea from '../ControlMenuArea';
import SearchFiltersArea from '../SearchFiltersArea';
import SearchResultsArea from '../SearchResultsArea';
import TagsDropBoard from '../TagsDropBoard';

@withStyles(styles)
class HomePage extends Component {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired
  };

  render() {
    const title = 'Home Page';
    this.context.onSetTitle(title);
    return (
      <div className="HomePage">
        <div className="HomePage-container">
          <ControlMenuArea flex="1" />
          <div style={{flex: '1.618', display: 'flex', flexDirection: 'column'}}>
            <SearchFiltersArea flex="2" />
            <TagsDropBoard flex="1" />
          </div>
          <SearchResultsArea flex="2.618" />
        </div>
      </div>
    );
  }

}

export default HomePage;
