import React, { useState, useEffect } from "react";
import { Paper, Typography, Button, TextField } from "@mui/material";
import Header from "../Components/Header"

export default function AllSales({ user }) {
  const [salesData, setSalesData] = useState([]);
  const [updateFormData, setUpdateFormData] = useState({
    saleId: null,
    status: "",
    paid_date: "",
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user === 1) {
      setIsAdmin(true)
    }
    // Fetch sales data from your backend API
    fetch("https://levick-29ef28f8e880.herokuapp.com/sales")
      .then((response) => response.json())
      .then((data) => {
        setSalesData(data);
      })

      .catch((error) => console.error("Error fetching sales data:", error));
  }, [user]);

  const handleUpdateClick = (saleId) => {
    // Set the saleId for the sale being updated
    setUpdateFormData({ saleId, status: "", paid_date: "" });
    setIsUpdating(true);
  };

  const handleUpdateCancel = () => {
    setIsUpdating(false);
  };

  const handleUpdateSubmit = () => {
    // Prepare the data to be sent in the PATCH request
    const updatedData = {
      status: updateFormData.status,
    };

    // Send a PATCH request to update the sale
    fetch(`https://levick-29ef28f8e880.herokuapp.com/sales/${updateFormData.saleId}`, {
      method: 'PATCH', // Use PATCH method
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sale: updatedData }),
    })
      .then((response) => {
        if (response.ok) {
          // Sale updated successfully, refresh the sales data
          fetch("https://levick-29ef28f8e880.herokuapp.com/sales")
            .then((response) => response.json())
            .then((data) => {
              setSalesData(data);
            })
            .catch((error) => console.error("Error fetching sales data:", error));

          // Clear the update form
          setUpdateFormData({ saleId: null, status: "", paid_date: "" });
          setIsUpdating(false);
        } else {
          // Handle error response here, e.g., show an error message to the user
          console.error("Error updating sale:", response.status);
        }
      })
      .catch((error) => console.error("Error updating sale:", error));
  };


  return (
    <div style={{ marginTop: "20px" }}>
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
          <Typography variant="body1">Status: {sale.status}</Typography>
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
      ))}
      <Header user={user} />
    </div>
  );
}
