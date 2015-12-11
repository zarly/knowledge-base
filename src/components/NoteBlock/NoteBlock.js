/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import withStyles from '../../decorators/withStyles';
import styles from './NoteBlock.css';

@withStyles(styles)
class NoteBlock extends Component {

  addTag () {
    this.props.onAddTag()
  }

  setTag () {
    this.props.onSetFilter()
  }

  render() {
    return (
      <div className="NoteBlock">
        <div>{this.props.children}</div>
        <div className="addTagBtn" onClick={this.addTag.bind(this)}>+</div>
        <div className="setTagBtn" onClick={this.setTag.bind(this)}>=</div>
      </div>
    );
  }

}

export default NoteBlock;
