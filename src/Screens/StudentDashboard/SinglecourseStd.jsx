import * as React from "react";

import {
  Avatar,
  CssBaseline,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../Config/Firebase/Firebase";
import { useParams } from "react-router-dom";
import Scroll from "../../Components/Scroll";
import { useState } from "react";
import Navbar from "../../Components/StudentNavbar";

export default function SinglecourseStd(props) {
  const { style, index } = props;
  const [dataArr, setdataArr] = useState([]);
  const [courseData, setcourseData] = useState([]);
  const param = useParams();
  React.useEffect(() => {
    console.log();

    const getData = async (colName) => {
      try {
        const q = query(
          collection(db, colName),
          where("Course.course", "==", param.id)
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
          where("course", "==", param.id)
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
  const matches = useMediaQuery("(max-width:400px)");
  const height = useMediaQuery("(max-height:554px)");
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
      <div style={{}}>
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
                  alignItems: "center",
                  justifyContent: "center",
                  paddingTop: "80px",
                }}
              >
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
            margin: "auto",
            gap: "10px",
            height: "50vh",
            overflow: "auto",
            maxWidth: "95vw",
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
      </div>
    </div>
  );
}
