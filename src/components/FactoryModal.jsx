import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { MODAL_ACTION_EDIT, MODAL_ACTION_CREATE } from '../constants/actions';

const defaultErrors = {
  name: false,
  count: false,
  upperBound: false,
  lowerBound: false
};

class FactoryModal extends Component {
  constructor() {
    super();

    this.state = {
      errors: Object.assign({}, defaultErrors)
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const { modalData, updateFactory, createFactory, hideModal } = this.props;

    const factoryId =
      (modalData.selectedNode && modalData.selectedNode.factoryId) || null;

    const factoryData = {
      factoryId,
      name: e.target['factory-name'].value,
      count: parseInt(e.target['factory-count'].value, 10),
      upperBound: parseInt(e.target['factory-upper-bound'].value, 10),
      lowerBound: parseInt(e.target['factory-lower-bound'].value, 10)
    };

    if (this.validateInputs(factoryData)) {
      return;
    }

    hideModal();

    if (this.props.modalData.action === MODAL_ACTION_EDIT) {
      updateFactory(factoryData);
      return;
    }

    createFactory(factoryData);
  };

  handleDelete = () => {
    const { modalData, deleteFactory, hideModal } = this.props;

    deleteFactory(modalData.selectedNode.factoryId);
    hideModal();
  };

  validateInputs = factoryData => {
    const errors = Object.assign({}, defaultErrors);
    const { name, count, upperBound, lowerBound } = factoryData;
    let errorFound = false;

    // Name should be non-empty string
    if (!name.length) {
      errors.name = true;
      errorFound = true;
    }

    // Count should be number between 1-15
    if (isNaN(count) || count < 1 || count > 15) {
      errors.count = true;
      errorFound = true;
    }

    // Lower bound must be a positive number lesser or equal to upper bound
    if (isNaN(lowerBound) || lowerBound < 0 || lowerBound > upperBound) {
      errors.lowerBound = true;
      errorFound = true;
    }

    // Upper bound must be a positive number greater or equal to lower bound
    if (isNaN(upperBound) || upperBound < 0 || upperBound < lowerBound) {
      errors.upperBound = true;
      errorFound = true;
    }

    this.setState({
      errors
    });

    return errorFound;
  };

  render = () => {
    const { errors } = this.state;
    const { hideModal } = this.props;
    const { action, selectedNode } = this.props.modalData;

    return (
      <div className="factory-modal">
        <div className="factory-modal__background" onClick={hideModal} />
        <Form className="factory-modal__form" onSubmit={this.handleSubmit}>
          <button
            type="button"
            className="factory-modal__close close"
            onClick={hideModal}
          >
            <span aria-hidden="true">&times;</span>
          </button>
          <div className="factory-modal__title">{action} Factory</div>
          <Form.Group className="factory-modal__input" controlId="factory-name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="input"
              placeholder="Enter Name"
              defaultValue={
                action === MODAL_ACTION_EDIT ? selectedNode.name : ''
              }
              isInvalid={errors.name}
            />
            <Form.Control.Feedback type="invalid">
              Name is required
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group
            className="factory-modal__input"
            controlId="factory-count"
          >
            <Form.Label>Node Count</Form.Label>
            <Form.Control
              type="input"
              placeholder="Enter Node Count"
              defaultValue={
                action === MODAL_ACTION_EDIT ? selectedNode.count : ''
              }
              isInvalid={errors.count}
            />
            <Form.Control.Feedback type="invalid">
              Count must be a number between 1 and 15.
            </Form.Control.Feedback>
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>
          <Form.Group
            className="factory-modal__input"
            controlId="factory-lower-bound"
          >
            <Form.Label>Lower Bound</Form.Label>
            <Form.Control
              type="input"
              placeholder="Enter Lower Bound"
              defaultValue={
                action === MODAL_ACTION_EDIT ? selectedNode.lowerBound : ''
              }
              isInvalid={errors.lowerBound}
            />
            <Form.Control.Feedback type="invalid">
              Lower bound must be a positive number lesser or equal to upper bound.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group
            className="factory-modal__input"
            controlId="factory-upper-bound"
          >
            <Form.Label>Upper Bound</Form.Label>
            <Form.Control
              type="input"
              placeholder="Enter Upper Bound"
              defaultValue={
                action === MODAL_ACTION_EDIT ? selectedNode.upperBound : ''
              }
              isInvalid={errors.upperBound}
            />
            <Form.Control.Feedback type="invalid">
              Upper bound must be a positive number greater or equal to lower bound.
            </Form.Control.Feedback>
          </Form.Group>
          <div className="factory-modal__button-wrapper">
            <Button variant="primary" type="submit">
              Save
            </Button>
            {action === MODAL_ACTION_EDIT && (
              <Button
                variant="danger"
                type="button"
                onClick={this.handleDelete}
              >
                Delete
              </Button>
            )}
          </div>
        </Form>
      </div>
    );
  }
}

FactoryModal.propTypes = {
  modalData: PropTypes.shape({
    action: PropTypes.string,
    selectedNode: PropTypes.shape({
      factoryId: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
      upperBound: PropTypes.number.isRequired,
      lowerBound: PropTypes.number.isRequired
    })
  })
};

FactoryModal.defaultProps = {
  modalData: {
    action: MODAL_ACTION_CREATE
  }
};

export default FactoryModal;
