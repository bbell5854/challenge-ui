import React from 'react';
import PropTypes from 'prop-types';

const ServerError = ({ message, closeError }) => (
  <div className="server-error alert alert-danger alert-dismissible fade show" role="alert">
    {message}
    <button type="button" className="close" aria-label="Close" onClick={closeError}>
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
);

ServerError.propTypes = {
  message: PropTypes.string.isRequired
};

export default ServerError;
