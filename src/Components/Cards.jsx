import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Config/Firebase/Firebase";
import Scroll from "./Scroll";
import { CardActionArea, Modal } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 400,
  flexWrap: "wrap",
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

export default function Cards() {
  const navigate = useNavigate();
  const param = useParams();

  function single(a) {
    navigate(a);
  }
  const [modaltext, setmodaltext] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [dataArr, setdataArr] = useState([]);

  React.useEffect(() => {
    const getAllData = async (colName) => {
      try {
        const querySnapshot = await getDocs(collection(db, colName));
        querySnapshot.forEach((doc) => {
          const obj = {
            docId: doc.id,
            ...doc.data(),
          };

          dataArr.push(obj);
          setdataArr([...dataArr]);
        });
      } catch (err) {
        [setmodaltext(err.code), handleOpen()];
      }
    };
    getAllData("Courses");
  }, []);
  return (
    <Box sx={{ height: "60vh", overflow: "auto" }}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6">{modaltext}</Typography>
        </Box>
      </Modal>
      {!dataArr[0] == "" ? (
        dataArr.map((item, index) => {
          return (
            <Card
              variant="outlined"
              key={index}
              sx={{
                margin: !index == 0 ? "20px 10px 0 0" : "0 10px 0 0",
                backgroundColor: "rgb(255,255,255,0.7)",
                backdropFilter: "blur(16px)",
              }}
            >
              <CardActionArea
                onClick={() => {
                  single(`singlecourse/${item.course}`);
                }}
              >
                <CardContent>
                  <Typography sx={{ fontSize: "27px" }} component="div">
                    {item.course}
                  </Typography>
                  <Typography variant="h6">
                    Course by Sir {item.Teacher}
                  </Typography>
                  <Typography
                    sx={{ margin: "14px 0 0 0 " }}
                    color="text.secondary"
                  >
                    Days: {item.Days}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          );
        })
      ) : (
        <Scroll />
      )}
    </Box>
  );
}
