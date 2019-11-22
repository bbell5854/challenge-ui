import React from 'react'
import PropTypes from 'prop-types';
import ChildNode from './ChildNode';

function FactoryNode(props) {
  const { name, upperBound, lowerBound, childNodes } = props.factoryData;
  return (
    <li className="factory-node node-path">
      <div className="factory-node__title-wrapper">
        <span className="factory-node__title">{name}</span>
        <span className="factory-node__bounds">{`${lowerBound} : ${upperBound}`}</span>
      </div>
      <ol className="factory-node__children">
        {childNodes.map(node => <ChildNode value={node} />)}
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
