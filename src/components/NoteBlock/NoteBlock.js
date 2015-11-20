/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import withStyles from '../../decorators/withStyles';
import styles from './NoteBlock.css';

@withStyles(styles)
class NoteBlock extends Component {

  render() {
    return (
      <div className="NoteBlock">
        {this.props.children}
      </div>
    );
  }

}

export default NoteBlock;
