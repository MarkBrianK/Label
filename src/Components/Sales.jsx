import React from "react";
import { Table, TableCell, TableRow, TableHead, TableBody,Button as TableButton } from "@mui/material";
import { Paper, Typography, Button as MobileButton } from "@mui/material";


export default function Sales({ clothes }) {
    const handleMakeSale = (clothId) => {
        // Implement your logic to create a sale for the selected cloth here
        // You can open a modal or navigate to a "Make a Sale" page
    };

    // Determine the screen width
    const isTableLayout = window.innerWidth >= 768;

    return (
        <div>
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
                        {clothes.map((cloth) => {
                            const imageUrls = JSON.parse(cloth.image);
                            const firstImageUrl = imageUrls.length > 0 ? imageUrls[0] : null;

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
                                        <TableButton variant="outlined" onClick={() => handleMakeSale(cloth.id)}>
                                            Make a Sale
                                        </TableButton>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            ) : (
                <div className="cards-container" sytle={{}}>
                    {clothes.map((cloth) => {
                        const imageUrls = JSON.parse(cloth.image);
                        const firstImageUrl = imageUrls.length > 0 ? imageUrls[0] : null;

                        return (
                            <Paper className="cloth-item" key={cloth.id}>
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
                                    Price: Ksh{cloth.price}/=
                                </Typography>
                                <Typography variant="body1" className="cloth-category">
                                    Category: {cloth.category.name}
                                </Typography>
                                <MobileButton variant="outlined" onClick={() => handleMakeSale(cloth.id)}>
                                    Make a Sale
                                </MobileButton>
                            </Paper>
                        );
                    })}

                </div>
            )}
        </div>
    );
}
