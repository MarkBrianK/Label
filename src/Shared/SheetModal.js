import React from 'react';


export default function SheetModal({ children}) {




  return (
    <div style={{
        borderTopLeftRadius: "45px",
        borderTopRightRadius: "45px",
        backgroundColor: "black",
        border: "1px solid goldenrod",
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
