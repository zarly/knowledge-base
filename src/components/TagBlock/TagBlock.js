/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import withStyles from '../../decorators/withStyles';
import styles from './TagBlock.css';

@withStyles(styles)
class TagBlock extends Component {

  render() {
    return (
      <div className="TagBlock">
        {this.props.children}
      </div>
    );
  }

}

export default TagBlock;
