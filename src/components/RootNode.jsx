import React, { Component } from 'react'

class RootNode extends Component {
  constructor() {
    super();
    this.state = {
      name: 'Root',
      factoryNodes: []
    };
  }
  render() {
    const { name, factoryNodes } = this.state;

    return (
      <div className="root-node">
        <div className="root-node__title">{name}</div>
        <div className="factory-node-wrapper">
          {factoryNodes.map(() => "test")}
        </div>
      </div>
    )
  }
}

export default RootNode;