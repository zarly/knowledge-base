/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './SearchResultsArea.css';
import withViewport from '../../decorators/withViewport';
import withStyles from '../../decorators/withStyles';
import NoteBlock from '../NoteBlock';
import EditingService from '../../services/editing_service.js';

@withStyles(styles)
class SearchResultsArea extends Component {

  constructor () {
    super();

    EditingService.on('notes:changed', (notes)=> {
      this.setState({notes: notes});
    });
  }

  state = {
    notes: []
  };

  onClickAddNewNote (e) {
    var title = this.refs.addingTitle.value;
    var content = this.refs.addingTextarea.value;
    var tags = (this.refs.addingTags.value || '').split(',').filter(tag => tag);

    if (!title && !content) {
      alert('Title or content required');
      return;
    }

    this.refs.addingTitle.value = '';
    this.refs.addingTextarea.value = '';
    this.refs.addingTags.value = '';

    EditingService.addNote(title, content, tags);
  }

  onAddTag (note) {
    EditingService.addTagLocally(note.title || note.content);
  }

  onSetFilter (note) {
    EditingService.setTagFilterLocally([note.title || note.content]);
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
          {!this.state.notes.length ?
              'No results here' :
              this.state.notes.map((note, n) => <NoteBlock key={n} onAddTag={this.onAddTag.bind(this, note)} onSetFilter={this.onSetFilter.bind(this, note)}>
                {note.content || ('tag: ' + note.title)}
              </NoteBlock>)}
        </div>
        <div className="SearchResultsArea-addingBlock" style={{height: '140px'}}>
          <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
            <input type="text" ref="addingTitle" className="secondary-field" placeholder="title" />
            <textarea ref="addingTextarea" placeholder="content" style={{flex: 1}}></textarea>
            <input type="text" ref="addingTags" className="secondary-field" placeholder="tag-1, tag-2, ..." />
          </div>
          <button style={{width: '140px'}} onClick={this.onClickAddNewNote.bind(this)}>Add new note</button>
        </div>
      </div>
    );
  }

}

export default SearchResultsArea;
