import React, { useState, useEffect } from 'react';
import Investor from './Investor';
import Summary from './Summary.js';
import './Dashboard.css';


const Dashboard = () => {

    const investorsData = JSON.parse(localStorage.getItem('investorsData')) || [];

    const [investors, setInvestors] = useState(investorsData);
    const [sortOption, setSortOption] = useState('money');
    const [showAddPopup, setShowAddPopup] = useState(false);
    const [name, setName] = useState('');
    const [money, setMoney] = useState(0);
    const [date, setDate] = useState('');
    const [contact, setContact] = useState('');
    const [validName, setValidName] = useState(false);
    const [validMoney, setValidMoney] = useState(false);
    const [validDate, setValidDate] = useState(false);
    const [validContact, setValidContact] = useState(false);
    const [validInvestor, setValidInvestor] = useState(false);
    let [totalInvestment, setTotalInvestment] = useState(0);
    let [totalROI, setTotalROI] = useState(0);

    useEffect(() => {
        handleSort(sortOption);
    }, [sortOption]);

    useEffect(() => {
        totalInvestment = investors.map(investor => investor.money).reduce((acc, curr) => acc + curr, 0);
        totalROI = investors.map(investor => investor.ROI).reduce((acc, curr) => acc + curr, 0);
        setTotalInvestment(totalInvestment);
        totalROI = Math.floor(totalROI);
        setTotalROI(totalROI);
        // Store data in sessionStorage
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
        setName('');
        setMoney(0);
        setDate('');
        setContact('');
        setValidName(false);
        setValidMoney(false);
        setValidDate(false);
        setValidContact(false);
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

    const handleNameChange = (e) => {
        const value = e.target.value;
        setName(value);
        setValidName(value.length > 4);
    };

    const handleMoneyChange = (e) => {
        const value = e.target.value;
        setMoney(value);
        setValidMoney(!isNaN(value) && parseFloat(value) > 999);
    };

    const handleDateChange = (e) => {
        const value = e.target.value;
        setDate(value);
        setValidDate(new Date(value) <= new Date());
    };

    const handleContactChange = (e) => {
        const value = e.target.value;
        setContact(value);
        setValidContact(/^\d{10}$/.test(value));
    };

    useEffect(() => {
        setValidInvestor(validName && validMoney && validDate && validContact);
    }, [validName, validMoney, validDate, validContact]);

    const handleAddSubmit = () => {
        const investmentDate = new Date(date);
        const currentDate = new Date();
        const timeDifference = currentDate - investmentDate;
        const daysDifference = timeDifference / (1000 * 3600 * 24);
        const yearsDifference = daysDifference / 365;

        const principal = money;
        const annualInterestRate = 1.0;
        const accumulatedAmount = principal * Math.pow((1 + annualInterestRate), yearsDifference);
        const calculatedROI = (accumulatedAmount - principal);

        totalROI = parseFloat(calculatedROI);
        console.log("DARSHAN", calculatedROI);
        const newInvestor = {
            name: name,
            money: parseFloat(money),
            date: date,
            contact: contact,
            ROI: calculatedROI
        };
        const updatedInvestors = [...investors, newInvestor];
        setInvestors(updatedInvestors);
        setShowAddPopup(false);
    };

    return (
        <div className="dashboard">
            <h1>Investors Dashboard</h1>
            <div className="controls">
                <select style={{ paddingRight: '1%' }} value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                    <option value="money">Sort by Money</option>
                    <option value="date">Sort by Date</option>
                </select>
                <button onClick={handleAddInvestor}>Add Customer</button>
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
                    <Investor key={index} {...investors} removeInvestor={() => removeInvestor(index)} customer={false} />
                ))}
                <Summary totalInvestment={totalInvestment} totalROI={totalROI} />
            </div>
            {showAddPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <button className="close-button" onClick={handlePopupClose}>X</button>
                        <h2 style={{ textAlign: 'center' }}>Add New Investor</h2>
                        <input type="text" name="name" placeholder="Name" onChange={handleNameChange} />
                        <input type="number" name="money" placeholder="Investment Amount" onChange={handleMoneyChange} />
                        <input type="date" name="date" placeholder="Investment Date" onChange={handleDateChange} />
                        <input type="text" name="contact" placeholder="Contact" onChange={handleContactChange} />
                        {validInvestor && <button onClick={handleAddSubmit}>Add Investor</button>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
