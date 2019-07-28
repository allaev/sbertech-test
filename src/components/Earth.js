import React from 'react';
import './Earth.css';

export default function Earth(props) {
  return (
    <img src={props.earthImage} alt="Earth" className="Earth" />
  );
}
