import React from 'react';
import './Investor.css';

const Investor = ({ totalInvestment, totalROI }) => {
    return (
        <div className="Summary">
            <div className="totalInvestment">Total Investment: {totalInvestment}</div>
            <div className="totalROI">Total ROI Pending: {totalROI}</div>
        </div>


    );
};

export default Investor;
