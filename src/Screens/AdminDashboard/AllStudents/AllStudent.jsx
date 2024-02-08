import React from "react";
import Cardstd from "../../../Components/StudentList";

const AllStudent = () => {
  return (
    <div>
      <div
      
        style={{
          backgroundColor: "rgb(25,118,210,0.7)",
          backdropFilter: "blur(16px)",
          marginBottom: "20px",
          color: "white",
          display: "flex",
          flexDirection: "column",
          borderRadius: "4px 4px 0 0",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            flexWrap: "wrap",
            fontSize: "30px",
            textAlign: "center",
            margin:'10px'
          }}
        >
         All Students
        </div>
      </div>

      <Cardstd />
    </div>
  );
};

export default AllStudent;
