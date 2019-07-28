import React, { Component } from 'react';
import './Button.css';

export default class Button extends Component {
  render() {
    return <div className="Button">
      <button onClick = { () => this.props.onClick() }>Запуск</button>
    </div>;
  }
};
