import React, { Component } from 'react';
import FactoryNode from './FactoryNode';

class RootNode extends Component {
  constructor() {
    super();
    this.state = {
      name: 'Root',
      factoryNodes: [
        {
          name: 'Brad',
          upperBound: 100,
          lowerBound: 1,
          childNodes: [1, 2, 3, 4]
        },
        {
          name: 'Brad2',
          upperBound: 100,
          lowerBound: 1,
          childNodes: [1, 2, 3]
        }
      ]
    };
  }

  render() {
    const { name, factoryNodes } = this.state;

    return (
      <div className="root-node">
        <div className="root-node__title">{name}</div>
        <ul className="root-node__children">
          {factoryNodes.map(factoryData => (
            <FactoryNode factoryData={factoryData} />
          ))}
        </ul>
      </div>
    );
  }
}

export default RootNode;
