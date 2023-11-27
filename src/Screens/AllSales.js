import React, { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  Button,
  TextField,
  FormControlLabel,
  Switch,
} from "@mui/material";
import Header from "../Components/Header";
import styles from "../Assets/Styles/AllSales.module.css";

export default function AllSales({ user }) {
  const [salesData, setSalesData] = useState([]);
  const [updateFormData, setUpdateFormData] = useState({
    saleId: null,
    status: "",
    paid_date: "",
  });
  const [isUpdating, setIsUpdating] = useState(false);
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
        const sortedSalesData = data.sort((a, b) => new Date(b.paid_date) - new Date(a.paid_date));
        setSalesData(sortedSalesData);
      })
      .catch((error) => console.error("Error fetching sales data:", error));
  }, [user]);

  const handleUpdateClick = (saleId) => {
    setUpdateFormData({ saleId, status: "", paid_date: "" });
    setIsUpdating(true);
  };

  const handleUpdateCancel = () => {
    setIsUpdating(false);
  };

  const handleUpdateSubmit = () => {
    const updatedData = {
      status: updateFormData.status,
    };

    fetch(`https://levick-6ab9bbf8750f.herokuapp.com/sales/${updateFormData.saleId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sale: updatedData }),
    })
      .then((response) => {
        if (response.ok) {
          window.location.reload();
          fetch("https://levick-6ab9bbf8750f.herokuapp.com/sales")
            .then((response) => response.json())
            .then((data) => {
              setSalesData(data);
            })
            .catch((error) => console.error("Error fetching sales data:", error));

          setUpdateFormData({ saleId: null, status: "", paid_date: "" });
          setIsUpdating(false);
        } else {
          console.error("Error updating sale:", response.status);
        }
      })
      .catch((error) => console.error("Error updating sale:", error));
  };

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

  return (
    <div>
      <div className={styles.mainContainer}>
        <FormControlLabel
          control={<Switch checked={filterByCurrentUser} onChange={toggleFilterByCurrentUser} />}
          label="My sales"
          className={styles.formControl}
        />
        <div className="salesGrid">
          {salesData.map((sale) => (
            <Paper className={styles.saleItem} key={sale.id}>
              <Typography className={styles.sales} variant="h6">
                Sale : {sale.reference_code}
              </Typography>

              <Typography className={styles.cloth} variant="body1">
                Item: {sale.cloth.name}
              </Typography>
              <Typography className={styles.date} variant="body1">
                Sale Date: {sale.paid_date}
              </Typography>
              <Typography className={styles.location} variant="body1">
                Customer Location: {sale.customer_location}
              </Typography>
              <Typography className={`${styles.paymentStatus} ${sale.status === "paid" ? styles.paidStatus : styles.unpaidStatus}`} variant="body1">
                Payment Status: {sale.status}
              </Typography>
              {isAdmin && (<>
                <Typography className={styles.agentName} variant="body1">
                Agent Name: {sale.user.name}
              </Typography>
              <Typography className={styles.agentNumber} variant="body1">
                Agent Number: {sale.user.mobile_number}
              </Typography>
              <Typography className={styles.region} variant="body1">
                Agent Region: {sale.user.county}
              </Typography>
                <Typography className={styles.customerNumber} variant="body1">
                  Customer Number: {sale.customer_number}
                </Typography>
                </>
              )}
              {isAdmin && isUpdating && updateFormData.saleId === sale.id ? (
                <div className={styles.buttonContainer}>
                  <TextField
                    label="Status"
                    variant="outlined"
                    fullWidth
                    value={updateFormData.status}
                    onChange={(e) => setUpdateFormData({ ...updateFormData, status: e.target.value })}
                  />
                  <Button
                    className={styles.updateButton}
                    variant="contained"
                    onClick={handleUpdateSubmit}
                  >
                    Update
                  </Button>
                  <Button
                    className={styles.cancelButton}
                    variant="contained"
                    onClick={handleUpdateCancel}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                isAdmin && (
                  <Button variant="contained" onClick={() => handleUpdateClick(sale.id)}>
                    Update
                  </Button>
                )
              )}
            </Paper>
          ))}
        </div>

      </div>
      <Header user={user} />
    </div>
  );
}
