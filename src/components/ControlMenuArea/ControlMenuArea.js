/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import styles from './ControlMenuArea.css';
import withStyles from '../../decorators/withStyles';
import Link from '../Link';

@withStyles(styles)
class ControlMenuArea extends Component {

  static propTypes = {
    className: PropTypes.string,
  };

  render() {
    var styles = {
      width: this.props.width,
      height: this.props.height,
      flex: this.props.flex
    };

    return (
      <div className={classNames(this.props.className, 'ControlMenuArea')} role="ControlMenuArea" style={styles}>
        <a className="ControlMenuArea-link" href="/about" onClick={Link.handleClick}>About</a>
        <a className="ControlMenuArea-link" href="/contact" onClick={Link.handleClick}>Contact</a>
        <hr className="ControlMenuArea-splitter" />
        <a className="ControlMenuArea-link" href="/login" onClick={Link.handleClick}>Log in</a>
        <a className="ControlMenuArea-link" href="/register" onClick={Link.handleClick}>Sign up</a>
      </div>
    );
  }

}

export default ControlMenuArea;
