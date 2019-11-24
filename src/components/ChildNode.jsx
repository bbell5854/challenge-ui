import React from 'react';
import PropTypes from 'prop-types';

const ChildNode = ({ value }) => (
  <li className="child-node node-path">
    <div className="child-node__title">{value}</div>
  </li>
);

ChildNode.propTypes = {
  value: PropTypes.number.isRequired
};

export default ChildNode;
