import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, TableCell, TableRow, TableHead, TableBody, Button as TableButton, TextField } from "@mui/material";
import { Paper, Typography, Button as MobileButton } from "@mui/material";
import Header from "./Header";
import MakeSaleForm from "../Screens/MakeSale";

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
        // Handle the sale submission here, e.g., send data to your backend
        // After successful submission, you can navigate or perform other actions

        // For this example, we'll log the data
        console.log("Sale submitted for:", selectedCloth, formData);

        // Reset the form and selected cloth
        setSelectedCloth(null);
        setIsMakingSale(false);
    };

    const handleCancelSale = () => {
        setSelectedCloth(null);
        setIsMakingSale(false);
    };

    // Determine the screen width
    const isTableLayout = window.innerWidth >= 768;

    return (
        <div style={{marginTop:"20px", marginBottom:"20px"}}>
            <TextField
                label="Search"
                variant="outlined"
                fullWidth
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            {isTableLayout ? (
                <Table className="table-responsive">
                    <TableHead>
                        <TableRow style={{ fontSize: "18px" }}>
                            <TableCell>Image</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Make a Sale</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className="table">
                        {filteredClothes.map((cloth) => {
                            const imageUrls = JSON.parse(cloth.image);
                            const firstImageUrl = imageUrls.length > 0 ? imageUrls[0] : null;
                            const clothId = cloth.id
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
                                        <TableButton variant="outlined" onClick={() => handleMakeSale(clothId)}>
                                            Make a Sale
                                        </TableButton>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            ) : (
                <div className="cards-container">
                    {filteredClothes.map((cloth) => {
                        const imageUrls = JSON.parse(cloth.image);
                        const firstImageUrl = imageUrls.length > 0 ? imageUrls[0] : null;
                        const clothId = cloth.id

                        return (
                            <Paper className="cloth-item" key={cloth.id} style={{marginTop:"20px"}}>
                                <img
                                    src={firstImageUrl}
                                    alt={cloth.name}
                                    className="cloth-image"
                                    style={{ width: "100px", height: "100px" }}
                                />
                                <Typography variant="h6" className="cloth-name">
                                    {cloth.name}
                                </Typography>
                                <Typography variant="body1" className="cloth-description">
                                    {cloth.description}
                                </Typography>
                                <Typography variant="body1" className="cloth-price">
                                    Price: Ksh {cloth.price}/=
                                </Typography>
                                <Typography variant="body1" className="cloth-category">
                                    Category: {cloth.category.name}
                                </Typography>
                                <MobileButton variant="outlined" onClick={() => handleMakeSale(clothId)}>
                                    Make a Sale
                                </MobileButton>
                            </Paper>
                        );
                    })}
                </div>
            )}
            {isMakingSale && selectedCloth && ( // Display the sale form if isMakingSale is true and a cloth is selected
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
