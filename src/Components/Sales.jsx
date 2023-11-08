import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import { Table, TableHead, TableBody, TableRow, TableCell } from "@mui/material";
import Header from "./Header";
import MakeSaleForm from "../Screens/MakeSale";
import styles from "../Assets/Styles/Sales.module.css"; 

export default function Sales({ clothes, user }) {
  const navigate = useNavigate();
  const [selectedCloth, setSelectedCloth] = useState(null);
  const [isMakingSale, setIsMakingSale] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredClothes = clothes.filter((cloth) =>
    cloth.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleMakeSale = (clothId) => {
    navigate(`/sales/${clothId}`);
  };

  const handleSaleSubmit = (selectedCloth, formData) => {
    setSelectedCloth(null);
    setIsMakingSale(false);
  };

  const handleCancelSale = () => {
    setSelectedCloth(null);
    setIsMakingSale(false);
  };

  return (
    <div className={styles.Container}>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className={styles.searchInput}
      />
      <div className={styles.tableContainer}>
        <Table className={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Make a Sale</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredClothes.map((cloth) => {
              const imageUrls = JSON.parse(cloth.image);
              const firstImageUrl = imageUrls.length > 0 ? imageUrls[0] : null;
              const clothId = cloth.id;

              return (
                <TableRow key={cloth.id}>
                  <TableCell>
                    {firstImageUrl && (
                      <img
                        src={firstImageUrl}
                        alt={cloth.name}
                        style={{ width: "100px", height: "100px" }}
                      />
                    )}
                  </TableCell>
                  <TableCell>{cloth.name}</TableCell>
                  <TableCell>{cloth.description}</TableCell>
                  <TableCell>Ksh {cloth.price}/=</TableCell>
                  <TableCell>{cloth.category.name}</TableCell>
                  <TableCell>
                    <button
                      onClick={() => handleMakeSale(clothId)}
                      className={styles.makeSaleButton}
                    >
                      Make a Sale
                    </button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      {isMakingSale && selectedCloth && (
        <MakeSaleForm
          selectedCloth={selectedCloth}
          onSaleSubmit={handleSaleSubmit}
          onCancel={handleCancelSale}
        />
      )}
      <Header user={user} />
    </div>
  );
}
