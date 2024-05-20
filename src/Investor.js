import React from 'react';
import './Investor.css';

const Investor = ({ name, money, date, contact ,ROI,removeInvestor, customer}) => {
  return (
    <div className="investor">
      <div className="investor-data">
        {!customer && <div className="investor-detail">
          <div className="investor-field">Name:</div>
          <div className="investor-value">{name}</div>
        </div>}
        <div className="investor-detail">
          <div className="investor-field">Money:</div>
          <div className="investor-value">₹{money}</div>
        </div>
        {!customer &&<div className="investor-detail">
          <div className="investor-field">Contact:</div>
          <div className="investor-value">{contact}</div>
        </div>}
        <div className="investor-detail">
          <div className="investor-field">Date:</div>
          <div className="investor-value">{date}</div>
        </div>
        <div className="investor-detail">
          <div className="investor-field">ROI:</div>
          <div className="investor-value">{ROI}</div>
        </div>
      </div>
      <div className="investor-actions">
        <button className="investor-button"style={{marginRight:'10%'}}>Refund</button>
        <button className="investor-button"style={{marginRight:'10%'}}>ROI</button>
        <button className="investor-button" onClick={removeInvestor}>Remove</button>
      </div>
    </div>
  );
};

export default Investor;
