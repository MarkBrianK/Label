import React from 'react';


export default function SheetModal({ children}) {




  return (
    <div style={{
        borderTopLeftRadius: "45px",
        borderTopRightRadius: "45px",
        backgroundColor: "black",
        display: "flex",
        justifyContent: "center",
        height: "fit-content",
        overflow: 'hidden',
        width:"100%",
        marginTop:"40px"

    }}>
      <div>{children}</div>
    </div>
  );
}
