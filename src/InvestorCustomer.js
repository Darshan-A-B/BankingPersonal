import React from 'react';
import './Investor.css';

const Investor = ({  money, date, ROI,removeInvestor}) => {
  const formattedDate = date.toLocaleString();
  return (
    <div className="investor">
      <div className="investor-data">
        
        <div className="investor-detail">
          <div className="investor-field">Money:</div>
          <div className="investor-value">₹{money}</div>
        </div>

        <div className="investor-detail">
          <div className="investor-field">Date:</div>
          <div className="investor-value">{formattedDate}</div>
        </div>
        <div className="investor-detail">
          <div className="investor-field">ROI:</div>
          <div className="investor-value">{ROI}</div>
        </div>
      </div>
      <div className="investor-actions">
        <button className="investor-button"style={{marginRight:'10%'}}>Raise Complaint</button>
        <button className="investor-button" onClick={removeInvestor}>Withdraw</button>
      </div>
    </div>
  );
};

export default Investor;
