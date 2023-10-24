import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import { useParams } from "react-router-dom";

export default function MakeSaleForm({ user, userdetails }) {
  const { clothId } = useParams();
  const [selectedCloth, setSelectedCloth] = useState({});

  useEffect(() => {
    // Fetch clothes data from the API
    fetch(`https://seal-app-p8ntf.ondigitalocean.app/cloths/${clothId}`)
      .then((response) => response.json())
      .then((data) => setSelectedCloth(data))
      .catch((error) => console.error("Error fetching clothes:", error));
  }, [clothId]);

  const [formData, setFormData] = useState({
    itemName: "",
    price: 0,
    description: "",
    customerName: "",
    customerNumber: "",
    customerLocation: "",
    paymentMethod: "Cash",
    paymentAmount: "",
    paymentInstructions: "",
    status: "unpaid", // Default status
  });

  useEffect(() => {
    // Update the form data with values from selectedCloth
    if (selectedCloth) {
      setFormData({
        itemName: selectedCloth.name,
        price: selectedCloth.price,
        description: selectedCloth.description,
        customerName: "",
        customerNumber: "",
        customerLocation: "",
        paymentAmount: "",
        status: "unpaid",
      });
    }
  }, [selectedCloth]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission here.
  };

  return (
    <div>
      <h2>Make a Sale</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="itemName">Item Name:</label>
          <input type="text" id="itemName" name="itemName" value={formData.itemName} readOnly />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input type="number" id="price" name="price" value={formData.price} readOnly />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea id="description" name="description" value={formData.description} readOnly />
        </div>
        <div>
          <label htmlFor="customerName">Customer Name:</label>
          <input type="text" id="customerName" name="customerName" value={formData.customerName} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="customerNumber">Customer Number:</label>
          <input type="text" id="customerNumber" name="customerNumber" value={formData.customerNumber} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="customerLocation">Customer Location:</label>
          <input type="text" id="customerLocation" name="customerLocation" value={formData.customerLocation} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="paymentAmount">Payment Amount:</label>
          <input type="number" id="paymentAmount" name="paymentAmount" value={formData.paymentAmount} onChange={handleChange} />
        </div>

        <button type="submit">Submit</button>
      </form>
      <Header user={user} />
    </div>
  );
}
