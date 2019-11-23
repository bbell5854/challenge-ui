import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ActionConstants from '../constants/actions';

const FactoryModal = (props) => {
  const { hideModal, handleSubmit, handleDelete } = props;
  const { action } = props.modalData;

  return (
    <div className="factory-modal">
      <div className="factory-modal__background" onClick={hideModal} />
      <Form className="factory-modal__form" onSubmit={handleSubmit}>
        <button type="button" className="factory-modal__close close" onClick={hideModal}>
          <span aria-hidden="true">&times;</span>
        </button>
        <div className="factory-modal__title">{action} Factory</div>
        <Form.Group controlId="factory-name">
          <Form.Control type="input" placeholder="Enter Name" />
        </Form.Group>
        <Form.Group controlId="factory-count">
          <Form.Control type="input" placeholder="Enter Node Count" />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Form.Group controlId="factory-lower-bound">
          <Form.Control type="input" placeholder="Enter Lower Bound" />
        </Form.Group>
        <Form.Group controlId="factory-upper-bound">
          <Form.Control type="input" placeholder="Enter Upper Name" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        {action === ActionConstants.MODAL_ACTION_EDIT && (
          <Button variant="danger" type="button" onClick={handleDelete}>
            Delete
          </Button>
        )}
      </Form>
    </div>
  );
}

FactoryModal.propTypes = {
  modalData: PropTypes.shape({
    action: PropTypes.string,
    factoryId: PropTypes.string
  })
};

FactoryModal.defaultProps = {
  modalData: {
    action: ActionConstants.MODAL_ACTION_CREATE
  }
};

export default FactoryModal;
