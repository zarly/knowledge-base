/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './TagsDropBoard.css';
import withViewport from '../../decorators/withViewport';
import withStyles from '../../decorators/withStyles';
import SearchBar from '../SearchBar';
import TagBlock from '../TagBlock';
import EditingService from '../../services/editing_service.js';

@withStyles(styles)
class TagsDropBoard extends Component {

  state = {
    tags: []
  };

  onDragOver (e) {
    e.preventDefault();
    if (e.target !== this) return;
    console.log('onDragOver', e);
  }

  onDragLeave (e) {
    e.preventDefault();
    if (e.target !== this) return;
    console.log('onDragLeave', e);
  }

  onDrop (e) {
    var tagTitle = e.dataTransfer.getData("tagTitle");
    this.state.tags.push({title: tagTitle});
    this.setState(this.state);
    console.log('onDrop', e, tagTitle);
  }

  onDeleteTag (tag) {
    EditingService.removeTagLocally(tag.title);
  }

  render() {
    var styles = {
      width: this.props.width,
      height: this.props.height,
      flex: this.props.flex
    };

    return (
      <div className="TagsDropBoard" style={styles} onDragOver={this.onDragOver.bind(this)} onDragLeave={this.onDragLeave.bind(this)} onDrop={this.onDrop.bind(this)}>
        {this.state.tags.map((tag, n) => <TagBlock key={n} onDelete={this.onDeleteTag.bind(this, tag)}>{tag.title}</TagBlock>)}
      </div>
    );
  }

}

export default TagsDropBoard;
