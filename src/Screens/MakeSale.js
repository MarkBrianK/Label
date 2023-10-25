import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import { useParams, useNavigate } from "react-router-dom";

export default function MakeSaleForm({ user }) {
  const navigate = useNavigate()
  const { clothId } = useParams();
  const user_id = user; // Assuming user information includes an 'id' property
  const [selectedCloth, setSelectedCloth] = useState({});
  const [formData, setFormData] = useState({
    reference_code: generateReferenceCode(),
    user_id: user_id,
    paid_date: new Date().toISOString(),
    cloth_id: clothId,
    customer_location: "",
    customer_number: "",
    status: "unpaid",
  });

  useEffect(() => {
    // Fetch cloth data from the API
    fetch(`https://seal-app-p8ntf.ondigitalocean.app/cloths/${clothId}`)
      .then((response) => response.json())
      .then((data) => setSelectedCloth(data))
      .catch((error) => console.error("Error fetching cloth:", error));
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
    fetch(" https://seal-app-p8ntf.ondigitalocean.app/sales", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);

        }
        return response.json();
      })
      .then((data) => {
        navigate('/')
        console.log(data)
      })
      .catch((error) => {
        console.error("Error submitting the sale:", error);
      });

  };

  return (
    <div>
      <h2>Make a Sale</h2>
      <p>Cloth Name: {selectedCloth.name}</p>
      <form onSubmit={handleSubmit}>
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
