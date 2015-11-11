/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './SearchResultsArea.css';
import withViewport from '../../decorators/withViewport';
import withStyles from '../../decorators/withStyles';
import TagBlock from '../TagBlock';
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
    var text = this.refs.addingTextarea.value;
    this.refs.addingTextarea.value = '';

    //this.setState({
    //  notes: this.state.notes.concat({text: text, key: Math.random()})
    //});

    EditingService.addNote(text);
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
              this.state.notes.map((note, n) => <TagBlock key={n}>{note.text}</TagBlock>)}
        </div>
        <div className="SearchResultsArea-addingBlock">
          <textarea ref="addingTextarea" style={{flex: 1, height: '100px'}}></textarea>
          <button style={{width: '100px', height: '100px'}} onClick={this.onClickAddNewNote.bind(this)}>Add new note</button>
        </div>
      </div>
    );
  }

}

export default SearchResultsArea;
