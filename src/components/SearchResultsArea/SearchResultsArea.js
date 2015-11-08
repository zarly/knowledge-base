/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './SearchResultsArea.css';
import withViewport from '../../decorators/withViewport';
import withStyles from '../../decorators/withStyles';

@withViewport
@withStyles(styles)
class SearchResultsArea extends Component {

  static propTypes = {
    viewport: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
    }).isRequired,
  };

  render() {
    // This is just an example how one can render CSS
    const { width, height } = this.props.viewport;
    this.renderCss(`.SearchResultsArea-viewport:after {content:' ${width}x${height}';}`);

    return (
      <div className="SearchResultsArea">
        Search results
      </div>
    );
  }

}

export default SearchResultsArea;
