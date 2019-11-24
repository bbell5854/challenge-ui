import React, { Component } from 'react';
import FactoryNode from './FactoryNode';
import FactoryModal from './FactoryModal';
import ServerError from './ServerError';
import io from 'socket.io-client';
import Button from 'react-bootstrap/Button';
import { MODAL_ACTION_CREATE, MODAL_ACTION_EDIT } from '../constants/actions';
import {
  FACTORY_CREATE_TOPIC,
  FACTORY_UPDATE_TOPIC,
  FACTORY_DISABLE_TOPIC,
  SESSION_EMIT_TOPIC,
  ERROR_RESPONSE_TOPIC
} from '../constants/topics';

const SERVER_HOST = process.env.SERVER_HOST;

class RootNode extends Component {
  constructor() {
    super();
    this.state = {
      name: 'Root',
      modal: {
        active: false
      },
      factoryNodes: []
    };
  }

  componentDidMount = () => {
    this.socket = io(SERVER_HOST);
    this.socket.on(SESSION_EMIT_TOPIC, this.sessionMegaphone);
    // TODO: Add Error component and display
    this.socket.on(ERROR_RESPONSE_TOPIC, this.setServerError);
  };

  sessionMegaphone = payload => {
    this.setState({
      factoryNodes: payload
    });
  };

  setServerError = payload => {
    this.setState({
      serverError: payload
    });
  };

  closeError = () => {
    this.setServerError(undefined);
  };

  emitSocketEvent = (topic = '', payload = {}) => {
    if (!topic.length) {
      throw new Error('Invalid topic passed in');
    }

    this.socket.emit(topic, payload);
  };

  hideModal = () => {
    this.setState({
      modal: {
        active: false
      }
    });
  };

  showCreateModal = () => {
    this.setState({
      modal: {
        active: true,
        action: MODAL_ACTION_CREATE
      }
    });
  };

  showEditModal = factoryId => {
    const foundNode = this.state.factoryNodes.find(
      e => e.factoryId === factoryId
    );

    const selectedNode = Object.assign({}, foundNode);

    this.setState({
      modal: {
        active: true,
        action: MODAL_ACTION_EDIT,
        selectedNode
      }
    });
  };

  createFactory = factoryData => {
    this.emitSocketEvent(FACTORY_CREATE_TOPIC, factoryData);
  };

  updateFactory = factoryData => {
    this.emitSocketEvent(FACTORY_UPDATE_TOPIC, factoryData);
  };

  deleteFactory = factoryId => {
    this.emitSocketEvent(FACTORY_DISABLE_TOPIC, { factoryId });
  };

  render = () => {
    const { name, factoryNodes, modal, serverError } = this.state;

    return (
      <div className="root-node">
        <div className="root-node__title">
          <span>{name}</span>
          <Button
            variant="outline-light"
            size="sm"
            type="button"
            onClick={this.showCreateModal}
          >
            Create Factory
          </Button>
        </div>
        <ul className="root-node__children">
          {factoryNodes &&
            factoryNodes.map(factoryData => (
              <FactoryNode
                key={factoryData.factoryId}
                factoryData={factoryData}
                showEditModal={this.showEditModal}
              />
            ))}
        </ul>
        {modal && modal.active && (
          <FactoryModal
            modalData={modal}
            hideModal={this.hideModal}
            createFactory={this.createFactory}
            updateFactory={this.updateFactory}
            deleteFactory={this.deleteFactory}
          />
        )}
        {serverError && serverError.message && (
          <ServerError
            message={serverError.message}
            closeError={this.closeError}
          />
        )}
      </div>
    );
  };
}

export default RootNode;
