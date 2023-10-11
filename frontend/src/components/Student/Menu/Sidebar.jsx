import React from "react";
import "./Sidebar.css";

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <button className="close-button" onClick={onClose}>
        Close
      </button>
      <div className="sidebar-content">
        <h2>Raj Da Dhaba</h2>
        <ul>
          <li>
            <a href="#">Menu</a>
          </li>
          <li>
            <a href="#">Orders</a>
          </li>
          <li>
            <a href="#">Delivery Tracking</a>
          </li>
          <li>
            <a href="#">Promotions</a>
          </li>
          <li>
            <a href="#">Account</a>
          </li>
        </ul>
      </div>
      <div className="sidebar-footer">
        <p>Contact Us: raj@foodelivery.com</p>
        <p>&copy; 2023 Food Delivery App</p>
      </div>
    </div>
  );
};

export default Sidebar;
