import React, { Component } from 'react';
import FactoryNode from './FactoryNode';
import FactoryModal from './FactoryModal';
import ActionConstants from '../constants/actions';

class RootNode extends Component {
  constructor() {
    super();
    this.state = {
      name: 'Root',
      modal: {
        active: false,
      },
      factoryNodes: [
        {
          factoryId: '1',
          name: 'Brad',
          upperBound: 100,
          lowerBound: 1,
          childNodes: [1, 2, 3, 4]
        },
        {
          factoryId: '2',
          name: 'Brad2',
          upperBound: 100,
          lowerBound: 1,
          childNodes: [1, 2, 3]
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
  }

  showCreateModal = () => {
    this.setState({
      modal: {
        active: true,
        action: ActionConstants.MODAL_ACTION_CREATE
      }
    });
  }

  showEditModal = factoryId => {
    this.setState({
      modal: {
        active: true,
        action: ActionConstants.MODAL_ACTION_EDIT,
        factoryId
      }
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('HOTDOGsubmit');
  }

  handleDelete = (e) => {
    const { factoryId } = this.state.modal;

    e.preventDefault();
    console.log('HOTDOGdelete', factoryId);
  }

  render() {
    const { name, factoryNodes, modal } = this.state;

    return (
      <div className="root-node">
        <div className="root-node__title">{name}</div>
        <ul className="root-node__children">
          {factoryNodes && factoryNodes.map(factoryData => (
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
            handleSubmit={this.handleSubmit}
            handleDelete={this.handleDelete}
          />
        )}
      </div>
    );
  }
}

export default RootNode;
