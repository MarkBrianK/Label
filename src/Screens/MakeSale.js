import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../Assets/Styles/MakeSales.module.css";

export default function MakeSaleForm({ user }) {
  const navigate = useNavigate();
  const { clothId } = useParams();
  const user_id = user;
  const [selectedCloth, setSelectedCloth] = useState({});
  const [formData, setFormData] = useState({
    reference_code: generateReferenceCode(),
    user_id: user_id,
    paid_date: new Date(),
    cloth_id: clothId,
    customer_location: "",
    customer_number: "",
    status: "unpaid",
  });

  useEffect(() => {
    // Fetch cloth data from the API using the native fetch API
    const fetchData = async () => {
      try {
        const response = await fetch(`https://levick-6ab9bbf8750f.herokuapp.com/cloths/${clothId}`);
        if (response.ok) {
          const data = await response.json();
          setSelectedCloth(data);
        } else {
          console.error("Error fetching cloth:", response.status, response.statusText);
        }
      } catch (error) {
        console.error("Error fetching cloth:", error);
      }
    };
    fetchData();
  }, [clothId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://levick-6ab9bbf8750f.herokuapp.com/sales", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate('/all_sales');
      } else {
        console.error("Error submitting the sale:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error submitting the sale:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Make a Sale</h2>
      <p className={
        styles.name
      }>Cloth Name: <span className={styles.selectedName}>
          {selectedCloth.name}
        </span> </p>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div>
          <label className={styles.labelName} htmlFor="customer_location">Customer Location:</label><br />
          <input
            className={styles.input}
            type="text"
            id="customer_location"
            name="customer_location"
            value={formData.customer_location}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className={styles.labelName} htmlFor="customer_number">Customer Number:</label><br />
          <input
            className={styles.input}
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
