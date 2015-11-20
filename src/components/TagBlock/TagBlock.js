/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import withStyles from '../../decorators/withStyles';
import styles from './TagBlock.css';

@withStyles(styles)
class TagBlock extends Component {

  deleteTag () {
    this.props.onDelete();
  }

  render() {
    return (
      <div className="TagBlock">
        <div>{this.props.children}</div>
        <div className="deleteBtn" onClick={this.deleteTag.bind(this)}>X</div>
      </div>
    );
  }

}

export default TagBlock;
