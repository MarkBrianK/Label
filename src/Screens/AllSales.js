import React, { useState, useEffect } from "react";
import { Paper, Typography, Button, TextField, FormControlLabel, Switch } from "@mui/material";
import Header from "../Components/Header";

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
        setSalesData(data);
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
    <div style={{ marginTop: "20px", marginBottom:"20px" }}>
      <FormControlLabel
        control={<Switch checked={filterByCurrentUser} onChange={toggleFilterByCurrentUser} />}
        label="My sales"
        style={{ position: "absolute", top: 0, right: 0, margin: "10px" }}
      />
      <Typography variant="h4">All Sales</Typography>
      {salesData.map((sale) => (
        <Paper className="sale-item" key={sale.id}>
          <Typography variant="h6">Sale : {sale.reference_code}</Typography>
          <Typography variant="body1">Agent Name: {sale.user.name}</Typography>
          <Typography variant="body1">Agent Number: {sale.user.mobile_number}</Typography>
          <Typography variant="body1">Agent region: {sale.user.county}</Typography>
          <Typography variant="body1">Cloth: {sale.cloth.name}</Typography>
          <Typography variant="body1">Sale Date: {sale.paid_date}</Typography>
          <Typography variant="body1">Customer Location: {sale.customer_location}</Typography>
          <Typography variant="body1">Payment status: {sale.status}</Typography>
          {isAdmin && <Typography variant="body1">Customer Number: {sale.customer_number}</Typography>}
          {isAdmin && isUpdating && updateFormData.saleId === sale.id ? (
            <div>
              <TextField
                label="Status"
                variant="outlined"
                fullWidth
                value={updateFormData.status}
                onChange={(e) => setUpdateFormData({ ...updateFormData, status: e.target.value })}
              />
              <Button variant="contained" onClick={handleUpdateSubmit}>
                Update
              </Button>
              <Button variant="contained" onClick={handleUpdateCancel}>
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
      )
      )}
      <Header user={user} />
    </div>
  );
}
