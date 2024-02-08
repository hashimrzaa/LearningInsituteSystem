import * as React from "react";

import {
  Avatar,
  CardActionArea,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import DeleteIcon from "@mui/icons-material/Delete";
import { auth, db } from "../Config/Firebase/Firebase";
import Scroll from "./Scroll";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "firebase/auth";
import { getAuth } from "firebase/auth";

export default function Cardstd(props) {
  const { style } = props;
  const [dataArr, setdataArr] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    const getAllData = async (colName) => {
      try {
        const q = query(
          collection(db, colName),
          where("type", "==", "student")
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
      } catch (err) {
        console.log(err);
      }
    };
    getAllData("users");
  }, []);
  const deleteuserdata = async (index) => {
    await deleteDoc(doc(db, "users", dataArr[index].docId));
    dataArr.splice(index, 1);
    setdataArr([...dataArr]);
  };
  const deleteuserauth = async (index) => {
    deleteUser()
      .then(() => {
        console.log("delted");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        height: "60vh",
        overflow: "auto",
      }}
    >
      {dataArr.length > 0 ? (
        dataArr.map((item, index) => {
          return (
            <ListItem style={style} key={index} component="div" disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate(`singlestudent/${item.id}`);
                }}
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
              <div
              style={{
                cursor:'pointer'
              }}
                onClick={(w) => {
                  deleteuserdata(index);
                }}
              >
                <DeleteIcon />
              </div>
            </ListItem>
          );
        })
      ) : (
        <div style={{
          textAlign:'center',
          fontSize:'25px'
        }}>
          No Item Found
        </div>
      )}
    </div>
  );
}
