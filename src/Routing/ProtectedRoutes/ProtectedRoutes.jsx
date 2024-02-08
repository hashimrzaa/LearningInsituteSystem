import { Box, CircularProgress } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../Config/Firebase/Firebase";
import AdminDashboard from "../../Screens/AdminDashboard/AdminDashboard";
import Scroll from "../../Components/Scroll";

function ProtectedRoutes({ component }) {
  //state
  const [loader, setLoader] = useState(true);
  const [admin, setadmin] = useState(false);
  //navigate

  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoader(false);
        user.email == "admin2540@gmail.com" ? setadmin(true) : false;
      } else {
        setLoader(true);
        navigate("/login");
      }
    });
  });

  return <>{loader ? <Scroll /> : !admin ? component : <AdminDashboard />}</>;
}

export default ProtectedRoutes;
