import React from 'react';

export default function Obstacle(props) {
  const left = Math.round(props.centerX - (props.width / 2));
  const top = Math.round(props.centerY - (props.height / 2));

  const style = {
    width: `calc(${props.width}px)`,
    height: `calc(${props.height}px)`,
    top: `calc(${top}px)`,
    left: `calc(${left}px)`,
    position: 'absolute',
    zIndex: 2
  };

  return (
    <img src={props.image} style={style} alt="Obstacle" className="Obstacle" />
  );
}
