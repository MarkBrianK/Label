import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import { useParams } from "react-router-dom";

export default function MakeSaleForm({ user }) {
  const { clothId } = useParams();
  const user_id = user.id; // Assuming user information includes an 'id' property
  const [selectedCloth, setSelectedCloth] = useState({});
  const [formData, setFormData] = useState({
    reference_code: generateReferenceCode(),
    user_id: user_id,
    cloth_id: selectedCloth.id,
    paid_date: new Date().toISOString(), // Use ISO format for date
    customer_location: "",
    customer_number: "",
    status: "unpaid",
  });

  useEffect(() => {
    // Fetch clothes data from the API
    fetch(`https://seal-app-p8ntf.ondigitalocean.app/cloths/${clothId}`)
      .then((response) => response.json())
      .then((data) => setSelectedCloth(data))
      .catch((error) => console.error("Error fetching clothes:", error));
  }, [clothId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission here, which may involve sending data to your backend API to create a sale record.
    // You can use formData to send the required data to your server.

    // Example: Send formData to your backend
    fetch("http://127.0.0.1:3001/sales", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response or any post-submission actions
      })
      .catch((error) => {
        console.error("Error submitting the sale:", error);
      });
  };

  return (
    <div>
      <h2>Make a Sale</h2>
      <form onSubmit={handleSubmit}>
        {/* Additional form fields for capturing sale data */}
        <div>
          <label htmlFor="customer_location">Customer Location:</label>
          <input
            type="text"
            id="customer_location"
            name="customer_location"
            value={formData.customer_location}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="customer_number">Customer Number:</label>
          <input
            type="text"
            id="customer_number"
            name="customer_number"
            value={formData.customer_number}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
      <Header user={user} />
    </div>
  );
}

function generateReferenceCode() {
  const timestamp = new Date().getTime();
  const randomNumber = Math.floor(Math.random() * 9000) + 1000;
  return `${timestamp}-${randomNumber}`;
}
