import React, { useState, useEffect } from "react";
import { Paper, Typography, Button, FormControlLabel, Switch } from "@mui/material";
import Header from "../Components/Header";
import styles from "../Assets/Styles/AllSales.module.css";

export default function AllSales({ user }) {
  const [salesData, setSalesData] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [filterByCurrentUser, setFilterByCurrentUser] = useState(false);

  useEffect(() => {
    if (user === 2) {
      setIsAdmin(true);
    }
    // Fetch sales data from your backend API
    fetch("https://levick-6ab9bbf8750f.herokuapp.com/sales")
      .then((response) => response.json())
      .then((data) => {
        setSalesData(data);
      })
      .catch((error) => console.error("Error fetching sales data:", error));
  }, [user]);

  function formatDateTime(dateTimeString) {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    const dateTime = new Date(dateTimeString);
    return dateTime.toLocaleString('en-US', options);
  }

  const toggleFilterByCurrentUser = () => {
    setFilterByCurrentUser(!filterByCurrentUser);
    if (filterByCurrentUser) {
      // Reset the sales data to its original state
      fetch("https://levick-6ab9bbf8750f.herokuapp.com/sales")
        .then((response) => response.json())
        .then((data) => {
          setSalesData(data);
        })
        .catch((error) => console.error("Error fetching sales data:", error));
    } else {
      // Filter sales by the current user
      const currentUserSales = salesData.filter((sale) => sale.user.id === user);
      setSalesData(currentUserSales);
    }
  };

  const renderSales = () => {
    return salesData.map((sale, index) => (
      <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={sale.id}>
        <Paper className={styles.saleItem}>
          <Typography className={styles.sales} variant="h6">
            Receipt {index + 1}
          </Typography>
          <div className={styles.cloth}>
            <div className={styles.label}>Agent Name:</div>
            <div className={styles.dynamicContent}>{sale.user.name}</div>
          </div>
          <div className={styles.cloth}>
            <div className={styles.label}>Agent Number:</div>
            <div className={styles.dynamicContent}>{sale.user.mobile_number}</div>
          </div>
          <div className={styles.cloth}>
            <div className={styles.label}>Agent Region:</div>
            <div className={styles.dynamicContent}>{sale.user.county}</div>
          </div>
          <div className={styles.cloth}>
            <div className={styles.label}>Cloth:</div>
            <div className={styles.dynamicContent}>{sale.cloth.name}</div>
          </div>
          <div className={styles.cloth}>
            <div className={styles.label}>Sale Date:</div>
            <div className={styles.dynamicContent}>
              {formatDateTime(sale.paid_date)}
            </div>
          </div>
          <div className={styles.cloth}>
            <div className={styles.label}>Customer Location:</div>
            <div className={styles.dynamicContent}>{sale.customer_location}</div>
          </div>
          <Typography
            className={`${styles.paymentStatus} ${
              sale.status === "paid" ? styles.paidStatus : styles.unpaidStatus
            }`}
            variant="body1"
          >
            Payment Status: {sale.status}
          </Typography>
        </Paper>
      </div>
    ));
  };

  return (
    <div className="container">
      <FormControlLabel
        control={<Switch checked={filterByCurrentUser} onChange={toggleFilterByCurrentUser} />}
        label="My sales"
        className={styles.formControl}
      />
      <Typography className={styles.heading} variant="h4">
        All Sales
      </Typography>
      <div className="row">
        {renderSales()}
      </div>
      <Header user={user} />
    </div>
  );
}
