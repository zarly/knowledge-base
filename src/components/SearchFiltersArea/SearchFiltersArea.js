/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './SearchFiltersArea.css';
import withViewport from '../../decorators/withViewport';
import withStyles from '../../decorators/withStyles';
import SearchBar from '../SearchBar';
import TagBlock from '../TagBlock';
import editingService from '../../services/editing_service.js';

@withStyles(styles)
class SearchFiltersArea extends Component {

  state = {
    tags: []
  };

  onSearchQueryChanged (input, resolve) {
    editingService.getTagsBySearchQuery(input, function (err, tags) {
      if (err) {
        console.error(err);
      }
      else {
        resolve(tags.map(function (tag) {
          return tag.title || '[no title]';
        }));
      }
    });
  }

  onSearchQuerySubmit (query) {
    this.state.tags.concat(query);
    this.setState({
      tags: this.state.tags.concat(query)
    });
    //this.render();
  }

  render() {
    var styles = {
      width: this.props.width,
      height: this.props.height,
      flex: this.props.flex
    };

    return (
      <div className="SearchFiltersArea" style={styles}>
        <SearchBar onChange={this.onSearchQueryChanged.bind(this)} onSubmit={this.onSearchQuerySubmit.bind(this)} />
        {this.state.tags.map((tag, n) => <TagBlock key={n}>{tag}</TagBlock>)}
      </div>
    );
  }

}

export default SearchFiltersArea;
