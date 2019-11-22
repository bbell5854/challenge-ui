import React from 'react'
import PropTypes from 'prop-types';
import ChildNode from './ChildNode';

function FactoryNode({ factoryData }) {
  return (
    <li className="factory-node node-path">
      <div className="factory-node__title">{factoryData.name}</div>
      <ol className="factory-node__children node-children">
        {factoryData.childNodes.map(node => <ChildNode value={node} />)}
      </ol>
    </li>
  )
}

FactoryNode.propTypes = {
  factoryData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    upperBound: PropTypes.number.isRequired,
    lowerBound: PropTypes.number.isRequired,
    childNodes: PropTypes.arrayOf(
      PropTypes.number,
    ).isRequired
  }).isRequired
}

export default FactoryNode
