import React from 'react'

function FactoryModal(props) {
  const { action } = props;

  return (
    <div className="factory-modal">
      <form className="factory-modal__form">
        <div className="factory-modal__title">{action} Factory</div>
        <div className="factory-modal__input">
          <input type="input" name="name" id="name" placeholder="Name" />
          <label for="name">Name</label>
        </div>
        <div className="factory-modal__input">
          <input type="input" name="count" id="count" placeholder="Count" />
          <label for="count">Count</label>
        </div>
        <div className="factory-modal__input">
          <input type="input" name="lowerBound" id="lowerBound" placeholder="Lower Bound" />
          <label for="lowerBound">Lower Bound</label>
        </div>
        <div className="factory-modal__input">
          <input type="input" name="upperBound" id="upperBound" placeholder="Upper Bound" />
          <label for="upperBound">Upper Bound</label>
        </div>
        <div className="factory-modal__submit">
          <button type="submit" name="submit">{action}</button>
        </div>
      </form>
    </div>
  )
}

export default FactoryModal
