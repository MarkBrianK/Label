import React, { useState, useEffect } from "react";
import { Paper, Typography, Button, TextField } from "@mui/material";

export default function AllSales({user}) {
  const [salesData, setSalesData] = useState([]);
  const [updateFormData, setUpdateFormData] = useState({
    saleId: null,
    status: "",
    paid_date: "",
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if(user===1){
      setIsAdmin(true)
    }
    // Fetch sales data from your backend API
    fetch("http://127.0.0.1:3001/sales")
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
    // Handle the update submission here, send data to your backend API
    // You can use the updateFormData to send the updated data

    // Example: Send updateFormData to your backend
    console.log(updateFormData);

    // After successful submission, you can reset the form and exit update mode
    setIsUpdating(false);
  };
  console.log(salesData)

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
          <Typography variant="body1">Customer Number: {sale.customer_number}</Typography>
          <Typography variant="body1">Status: {sale.status}</Typography>
          {isAdmin && isUpdating && updateFormData.saleId === sale.id ? (
            <div>
              <TextField
                label="Status"
                variant="outlined"
                fullWidth
                value={updateFormData.status}
                onChange={(e) => setUpdateFormData({ ...updateFormData, status: e.target.value })}
              />
              <TextField
                label="Paid Date"
                variant="outlined"
                fullWidth
                value={updateFormData.paid_date}
                onChange={(e) => setUpdateFormData({ ...updateFormData, paid_date: e.target.value })}
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
    </div>
  );
}
