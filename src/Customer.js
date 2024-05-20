import React, { useState, useEffect } from 'react';
import InvestorCustomer from './InvestorCustomer';
import Summary from './Summary.js';
import './Dashboard.css';

const investorsData = JSON.parse(localStorage.getItem('investorsData')) || [];

const Customer = () => {
    
    const [investors, setInvestors] = useState(investorsData);
    const [sortOption, setSortOption] = useState('money');
    const [showAddPopup, setShowAddPopup] = useState(false);
    const [money, setMoney] = useState(0);
    const [validMoney, setValidMoney] = useState(false);
    const [validInvestor, setValidInvestor] = useState(false);
    let [totalInvestment, setTotalInvestment] = useState(0);
    let [totalROI, setTotalROI] = useState(0);
    useEffect(() => {
        handleSort(sortOption);
    }, [sortOption]);

    useEffect(() => {
        totalInvestment = investors.map(investor => investor.money).reduce((acc, curr) => acc + curr, 0);
        totalROI = investors.map(investor => investor.ROI).reduce((acc, curr) => acc + curr, 0);
        totalROI = Math.floor(totalROI);
        setTotalInvestment(totalInvestment);
        setTotalROI(totalROI);
        localStorage.setItem('investorsData', JSON.stringify(investors));
    }, [investors]);

    const handleSort = (option) => {
        let sortedInvestors = [...investors];
        if (option === 'money') {
            sortedInvestors.sort((a, b) => b.money - a.money);
        } else if (option === 'date') {
            sortedInvestors.sort((a, b) => new Date(a.date) - new Date(b.date));
        }
        setInvestors(sortedInvestors);
    };

    const handleAddInvestor = () => {
        
        setMoney(0);
        setValidMoney(false);
        setValidInvestor(false);
        setShowAddPopup(true);
    };

    const handlePopupClose = () => {
        setShowAddPopup(false);
    };

    const removeInvestor = (indexToRemove) => {
        const updatedInvestors = investors.filter((_, index) => index !== indexToRemove);
        setInvestors(updatedInvestors);
    };


    const handleMoneyChange = (e) => {
        const value = e.target.value;
        setMoney(value);
        setValidMoney(!isNaN(value) && parseFloat(value) > 999);
    };



    useEffect(() => {
        setValidInvestor( validMoney );
    }, [ validMoney]);

    const handleAddSubmit = () => {
        const currentDate = new Date();
        const calculatedROI=money/365;
        const newInvestor = {
            money: parseFloat(money),
            date: currentDate,
            ROI: calculatedROI
        };
        const updatedInvestors = [...investors, newInvestor];
        setInvestors(updatedInvestors);
        setShowAddPopup(false);
    };

    return (
        <div className="dashboard">
            <h1>My Portfolio</h1>
            <div className="controls">
                <select style={{ paddingRight: '1%' }} value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                    <option value="money">Sort by Money</option>
                    <option value="date">Sort by Date</option>
                </select>
                <button onClick={handleAddInvestor}>Invest Now</button>
            </div>
            <div className="investor-list">
                <div className="centered-content">
                    {investors.length === 0 ? (
                        <div className="no-investors">
                            <span role="img" aria-label="sad emoji" style={{ fontSize: '3em' }}>😞</span>
                            <p>No investments found.</p>
                        </div>
                    ) : ''}
                </div>
                {investors.map((investors, index) => (
                    <InvestorCustomer key={index} {...investors} removeInvestor={() => removeInvestor(index)} customer={true} />
                ))}
                <Summary totalInvestment={totalInvestment} totalROI={totalROI}  />
            </div>
            {showAddPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <button className="close-button" onClick={handlePopupClose}>X</button>
                        <h2 style={{ textAlign: 'center' }}>Add New Investment</h2>
                        <p style={{ textAlign: "center" }}>Minimum Investment allowed 1000</p>
                        <input type="number" name="money" placeholder="Investment Amount" onChange={handleMoneyChange} />
                        {validInvestor && <button onClick={handleAddSubmit}>Proceed for Payment </button>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Customer;
