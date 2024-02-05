import * as React from "react";

import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../../Config/Firebase/Firebase";
import { useNavigate, useParams } from "react-router-dom";
import Scroll from "../../../Components/Scroll";
import { useState } from "react";

export default function Singlecourse(props) {
  const { style, index } = props;
  const [dataArr, setdataArr] = useState([]);
  const [courseData, setcourseData] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  React.useEffect(() => {
    const getData = async (colName) => {
      try {
        const q = query(
          collection(db, colName),
          where("Course.course", "==", params.id)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          const obj = {
            docId: doc.id,
            ...doc.data(),
          };
          dataArr.push(obj);
          setdataArr([...dataArr]);
        });
      } catch (error) {
        console.log(error);
      }
    };
    const getcourseData = async (colName) => {
      try {
        const q = query(
          collection(db, colName),
          where("course", "==", params.id)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          const obj = {
            docId: doc.id,
            ...doc.data(),
          };
          setcourseData([obj]);
        });
      } catch (error) {
        console.log(error);
      }
    };

    getData("users");
    getcourseData("Courses");
  }, []);
  return (
    <>
      {courseData.length > 0 ? (
        courseData.map((item, index) => {
          return (
            <div
              key={index}
              style={{
                backgroundColor: "rgb(25,118,210,0.7)",
                backdropFilter: "blur(16px)",
                marginBottom: "20px",
                color: "white",
                display: "flex",
                flexDirection: "column",
                borderRadius: "5px 5px 0 0",
                alignItems: "center",
                justifyContent: "center",
                paddingTop: "14px",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "10px",
                  left: "10px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigate("/adminpannel/allcourses");
                }}
              >
                <ArrowBackIcon />
              </div>
              <div
                style={{
                  flexWrap: "wrap",
                  fontSize: "2.7rem",
                  textAlign: "center",
                  lineHeight: 1.3,
                  color: "black",
                  fontWeight: "bold",
                  letterSpacing: "1px",
                }}
              >
                {item.course}
              </div>
              <div
                style={{
                  flexWrap: "wrap",
                  fontSize: "2rem",
                  textAlign: "center",
                  letterSpacing: "5px",
                }}
              >
                Course By {item.Teacher}
              </div>
              <div
                style={{
                  flexWrap: "wrap",
                  fontSize: "0.9rem",
                  textAlign: "center",

                  letterSpacing: "2px",
                }}
              >
                Available Days are
                {item.Days === "TTS"
                  ? " Tuesday , Thursday , Saturday"
                  : " Monday , Wednesday , Friday"}{" "}
              </div>
              <div
                style={{
                  flexWrap: "wrap",
                  fontSize: "0.9rem",
                  textAlign: "center",
                  margin: "10px",
                  wordSpacing: "1px",
                  letterSpacing: "3px",
                }}
              >
                {dataArr.length} Students are available
              </div>
            </div>
          );
        })
      ) : (
        <Scroll />
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          height: "50vh",
          overflow: "auto",
        }}
      >
        {dataArr.length > 0 ? (
          dataArr.map((item, index) => {
            return (
              <ListItem
                style={style}
                key={index}
                component="div"
                disablePadding
              >
                <ListItemButton
                  sx={{
                    backgroundColor: "rgb(255,255,255,0.7)",
                    backdropFilter: "blur(16px)",
                    borderRadius: "10px",
                    marginRight: "10px",
                  }}
                >
                  <ListItemAvatar>
                    <Avatar alt="hashim" src={item.ImageUrl} />
                  </ListItemAvatar>
                  <ListItemText>{item.Name}</ListItemText>
                </ListItemButton>
              </ListItem>
            );
          })
        ) : (
          <div>
            <h1 style={{ textAlign: "center" }}>No item found</h1>
          </div>
        )}
      </div>
    </>
  );
}
