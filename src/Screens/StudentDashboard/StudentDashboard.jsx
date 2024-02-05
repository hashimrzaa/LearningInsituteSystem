import React from "react";

import Navbar from "../../Components/StudentNavbar";
import { Button, CssBaseline, useMediaQuery } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../Config/Firebase/Firebase";

const StudentDashboard = () => {
  const param = useParams();
  const navigate = useNavigate();
  const [dataArr, setdataArr] = useState([]);

  useEffect(() => {
    const getData = async (colName) => {
      try {
        const q = query(
          collection(db, colName),
          where("id", "==", auth.currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          const obj = {
            docId: doc.id,
            ...doc.data(),
          };
          setdataArr([obj]);
        });
      } catch (error) {
        alert(error.code);
      }
    };

    getData("users");
  }, []);
  return (
    <div
      style={{
        backgroundImage:
        "url(https://media.springernature.com/full/springer-static/image/art%3A10.1038%2F494027a/MediaObjects/41586_2013_BF494027a_Figa_HTML.jpg)",
      backgroundRepeat: "no-repeat",
      height: "100vh",
      overflow: "auto",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
      }}
    >
      <CssBaseline />
      <Navbar />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Button
          variant="outlined"
          sx={{
            color: "white",
            background: "#1976d2",
          }}
          onClick={() => {
            navigate(`/singlecourse/${dataArr[0].Course.course}`);
          }}
        >
          back to course
        </Button>
      </div>
    </div>
  );
};

export default StudentDashboard;
