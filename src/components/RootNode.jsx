import React, { Component } from 'react';
import FactoryNode from './FactoryNode';
import FactoryModal from './FactoryModal';
import Button from 'react-bootstrap/Button';
import { MODAL_ACTION_CREATE, MODAL_ACTION_EDIT } from '../constants/actions';

class RootNode extends Component {
  constructor() {
    super();
    this.state = {
      name: 'Root',
      modal: {
        active: false
      },
      factoryNodes: [
        {
          factoryId: '1',
          name: 'Brad',
          count: 4,
          lowerBound: 1,
          upperBound: 100,
          childNodes: [1, 2, 3, 4]
        },
        {
          factoryId: '2',
          name: 'Brad2',
          count: 3,
          lowerBound: 10,
          upperBound: 25,
          childNodes: [10, 12, 13]
        }
      ]
    };
  }

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
      e => (e.factoryId === factoryId)
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
    console.log('HOTDOGcreate', factoryData);
  };

  updateFactory = factoryData => {
    console.log('HOTDOGupdate', factoryData);
  };

  deleteFactory = factoryId => {
    console.log('HOTDOGdelete', factoryId);
  };

  render() {
    const { name, factoryNodes, modal } = this.state;

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
      </div>
    );
  }
}

export default RootNode;
