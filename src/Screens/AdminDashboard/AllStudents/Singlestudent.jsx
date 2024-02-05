import * as React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../Config/Firebase/Firebase";
import { useNavigate, useParams } from "react-router-dom";
import Scroll from "../../../Components/Scroll";
import { useState } from "react";

export default function Singlestudent(props) {
  const { style } = props;
  const [dataArr, setdataArr] = useState([]);
  const params = useParams();

  React.useEffect(() => {
    const getData = async (colName) => {
      try {
        const q = query(collection(db, colName), where("id", "==", params.id));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          const obj = {
            docId: doc.id,
            ...doc.data(),
          };
          setdataArr([obj]);
        });
      } catch (error) {
        console.log(error);
      }
    };
    getData("users");
  }, []);

  const navigate = useNavigate();
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {dataArr.length > 0 ? (
          dataArr.map((item, index) => {
            return (
              <Card
                key={index}
                sx={{
                  backgroundColor: "rgb(255,255,255,0.7)",
                  backdropFilter: "blur(16px)",
                  marginRight: "10px",
                  position: "relative",
                }}
              >
                <div
                  onClick={() => {
                    navigate("/adminpannel/allstudents");
                  }}
                  style={{
                    position: "absolute",
                    top: "10px",
                    left: "10px",
                    cursor: "pointer",
                  }}
                >
                  <ArrowBackIcon sx={{ color: "white" }} />
                </div>
                {item.ImageUrl ? (
                  <CardMedia
                    component="img"
                    height="350"
                    image={item.ImageUrl}
                    alt={item.Name}
                  />
                ) : (
                  <Typography sx={{ mt: 9, mb: 16, position: "relative" }}>
                    <Scroll />
                  </Typography>
                )}
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.Name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.gender}
                  </Typography>
                  <Typography variant="p" color="text.secondary">
                    {item.email}
                  </Typography>
                  <Typography style={{ fontSize: "15px" }}>
                    From {item.address}
                  </Typography>
                  <Typography variant="h6"> {item.Course.course}</Typography>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <Scroll />
        )}
      </div>
    </>
  );
}
