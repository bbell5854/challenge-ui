import React from 'react';
import PropTypes from 'prop-types';
import ChildNode from './ChildNode';

const FactoryNode = props => {
  const { showEditModal } = props;
  const {
    factoryId,
    name,
    upperBound,
    lowerBound,
    childNodes
  } = props.factoryData;

  function handleShowEditModal() {
    showEditModal(factoryId);
  }

  return (
    <li className="factory-node node-path">
      <div
        className="factory-node__title-wrapper"
        onClick={handleShowEditModal}
      >
        <span className="factory-node__title">{name}</span>
        <span className="factory-node__bounds">{`${lowerBound} : ${upperBound}`}</span>
      </div>
      <ol className="factory-node__children">
        {childNodes &&
          childNodes.map((value, key) => <ChildNode key={key} value={value} />)}
      </ol>
    </li>
  );
};

FactoryNode.propTypes = {
  factoryData: PropTypes.shape({
    factoryId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    upperBound: PropTypes.number.isRequired,
    lowerBound: PropTypes.number.isRequired,
    childNodes: PropTypes.arrayOf(PropTypes.number).isRequired
  }).isRequired
};

export default FactoryNode;
