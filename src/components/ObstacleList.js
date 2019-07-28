import React, { Component } from 'react';
import './ObstacleList.css';

export default class ObstacleList extends Component {
    render() {
      return (
      <div className="ObstacleList">
        <div>
          <span>Спутники</span>
          <button className="remove">Remove Satellite</button>
          <button className="add">Add Satellite</button>
        </div>
        <label htmlFor="satellite1">Спутник 1</label>
        <input type="range" id="satellite1" name="satellite1" min="20" max="100" defaultValue="50" step="1" onChange={(e) => this.props.onChange} />
        <label htmlFor="satellite2">Спутник 2</label>
        <input type="range" id="satellite2" name="satellite2" min="20" max="100" defaultValue="50" step="1" onChange={(e) => this.props.onChange} />
        <label htmlFor="satellite3">Спутник 3</label>
        <input type="range" id="satellite3" name="satellite3" min="20" max="100" defaultValue="50" step="1" onChange={(e) => this.props.onChange} />
        <label htmlFor="satellite4">Спутник 4</label>
        <input type="range" id="satellite4" name="satellite4" min="20" max="100" defaultValue="50" step="1" onChange={(e) => this.props.onChange} />
        <label htmlFor="satellite4">Луна</label>
        <input type="range" id="satellite5" name="satellite5" min="20" max="100" defaultValue="50" step="1" onChange={(e) => this.props.onChange} />
      </div>);
    }
  };
