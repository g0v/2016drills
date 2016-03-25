import React from 'react';
import ReactDOM from 'react-dom';
import c from 'classnames';

import style from './link.css';

export default (props) => {
  return <a className={style.link} href={props.href}>{props.children}</a>;
};