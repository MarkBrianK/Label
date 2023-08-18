import React from 'react';


export default function SheetModal({ children}) {




  return (
    <div style={{
        borderTopLeftRadius: "45px",
        borderTopRightRadius: "45px",
        backgroundColor: "black",
        borderLeft: "0.5px solid grey",
        borderRight: "0.5px solid grey",
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        overflow: 'hidden',
        width:"100%",
        marginTop:"20px"

    }}>
      <div>{children}</div>
    </div>
  );
}
