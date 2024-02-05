import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import {
  Box,
  Modal,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { auth, db } from "../../Config/Firebase/Firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { styled } from "@mui/material/styles";
import { storage } from "../../Config/Firebase/firebaseconfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect } from "react";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

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

export default function SimpleContainer() {
  // useState
  const [loder, setloder] = useState(false);
  const [loder2, setloder2] = useState(false);
  // modal

  const [modaltext, setmodaltext] = useState("");
  const [open, setOpen] = React.useState(false);

  // modal Functions

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // useEffect get data

  // courses data from admin pannel
  const [dataArr, setdataArr] = useState([]);

  useEffect(() => {
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
        [setmodaltext(err.message), handleOpen()];
      }
    };

    // data function call

    getAllData("Courses");
  }, []);

  // media query check
  const matches = useMediaQuery("(max-width:730px)");

  // course value
  const [age, setAge] = React.useState("");
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  // gender value
  const [age2, setAge2] = React.useState("");
  const handleChange2 = (event) => {
    setAge2(event.target.value);
  };

  // user data refs
  const email = React.useRef();
  const passwordref = React.useRef();
  const firstname = React.useRef();
  const lastname = React.useRef();
  const adressref = React.useRef();

  // Navigate to single course
  const navigate = useNavigate();
  function nav() {
    navigate(`/singlecourse/${age.course}`);
  }

  // user data submit
  function signup(obj) {
    setloder2(true);
    return new Promise((resolve, reject) => {
      createUserWithEmailAndPassword(auth, obj.email, obj.password)
        .then(async (res) => {
          resolve((obj.id = res.user.uid));
          // user data add
          await addDoc(collection(db, "users"), obj)
            .then((res) => {
              nav();
            })
            .catch((err) => {
              [setmodaltext(err.message), handleOpen()];
              setloder2(false);
            });
        })
        .catch((err) => {
          reject(err.message);
          setloder2(false)[(setmodaltext(err.message), handleOpen())];
        });
    });
  }

  // storage add and get
  let [imgurl, setimgurl] = React.useState();

  let file = [];

  function addFile() {
    const files = file[0][0];

    const storageRef = ref(storage, email.current.value);
    uploadBytes(storageRef, files)
      .then(() => {
        getDownloadURL(storageRef)
          .then((url) => {
            setimgurl(`${url}`);
          })
          .catch((err) => {
            [setmodaltext(err), handleOpen()];
          });
      })
      .catch((err) => {
        [setmodaltext(err), handleOpen()];
      });
  }

  return (
    <div
      style={{
        backgroundImage:
          "url(https://media.springernature.com/full/springer-static/image/art%3A10.1038%2F494027a/MediaObjects/41586_2013_BF494027a_Figa_HTML.jpg)",
        backgroundRepeat: "no-repeat",
       
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
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
      <CssBaseline />
      <Container maxWidth="lr">
        <div
          style={{
            height:  "100vh" ,

            backgroundColor: "rgb(255,255,255,0.7)",
            backdropFilter: "blur(16px)",
            maxWidth: "1000px",
            margin: "auto",
            boxShadow:
              "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
            overflow: "auto",
          }}
        >
          <h1
            style={{
              color: "white",
              margin: "0",
              padding: "25px",
              flexWrap: "wrap",
              textAlign: "center",
              width: "100%",
              background: "#1976D2",
            }}
          >
            CBHR Admission Form
          </h1>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              imgurl
                ? signup({
                    Name:
                      firstname.current.value + " " + lastname.current.value,
                    email: email.current.value,
                    password: passwordref.current.value,
                    gender: age2,
                    Course: age,
                    address: adressref.current.value,
                    type: "student",
                    ImageUrl: imgurl,
                  })
                : [setmodaltext("submit the file and wait"), handleOpen()];
            }}
            style={{
              margin: "auto",
              alignItems: "center",
            }}
          >
            <div
              style={{
                flexWrap: matches ? "wrap" : "nowrap",
                padding: "20px",
                marginTop: "10px",
                margin: "auto",
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
                gap: "40px",
              }}
            >
              <TextField
                autoComplete="off"
                required
                type="text"
                fullWidth
                label="First Name"
                inputRef={firstname}
                variant="filled"
              />
              <TextField
                autoComplete="off"
                required
                type="text"
                fullWidth
                label="Last Name"
                variant="filled"
                inputRef={lastname}
              />
            </div>
            <div
              style={{
                flexWrap: matches ? "wrap" : "nowrap",

                padding: "20px",
                margin: "auto",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                gap: "40px",
              }}
            >
              <TextField
                autoComplete="off"
                inputRef={email}
                required
                type="email"
                fullWidth
                id="outlined-basic"
                label="Email"
                variant="filled"
              />
              <TextField
                autoComplete="off"
                inputRef={passwordref}
                required
                fullWidth
                type="password"
                label="Password"
                variant="filled"
              />
            </div>
            <div
              style={{
                flexWrap: matches ? "wrap" : "nowrap",

                padding: "20px",
                paddingTop: "20",
                margin: "auto",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                gap: "40px",
              }}
            >
              <FormControl fullWidth>
                <InputLabel id="Course">Course</InputLabel>
                <Select
                  required
                  labelId="Course"
                  id="Course"
                  value={age}
                  label="Course"
                  onChange={handleChange}
                >
                  {dataArr.map((element, index) => {
                    return (
                      <MenuItem key={index} value={element}>
                        {element.course}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="Select Gender">Select Gender</InputLabel>
                <Select
                  required
                  labelId="Select Gender"
                  id="Select Gender"
                  value={age2}
                  label="Select Gender"
                  onChange={handleChange2}
                >
                  <MenuItem value={"male"}>Male</MenuItem>
                  <MenuItem value={"female"}>Female</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div
              style={{
                flexWrap: matches ? "wrap" : "nowrap",

                padding: "20px",
                margin: "auto",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                gap: "40px",
              }}
            >
              <TextField
                autoComplete="off"
                required
                type="text"
                fullWidth
                id="Adress"
                label="Address"
                variant="filled"
                inputRef={adressref}
              />
            </div>
            <div
              style={{
                flexWrap: matches ? "wrap" : "nowrap",

                padding: "3px",
                margin: "auto",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                gap: "40px",
              }}
            >
              <Button
                component="label"
                variant="text"
                startIcon={<CloudUploadIcon />}
              >
                Upload file
                <VisuallyHiddenInput
                  required
                  type="file"
                  onChange={(e) => {
                    file.push(e.target.files);
                  }}
                />
              </Button>

              <Button
                variant="contained"
                onClick={(w) => {
                  w.preventDefault();
                  setloder(true);
                  !email.current.value == "" && !file[0] == ""
                    ? addFile()
                    : email.current.value == ""
                    ? [
                        setmodaltext("First fill the email"),
                        [handleOpen(), setloder(false)],
                      ]
                    : [
                        setmodaltext("Please add file"),
                        [handleOpen(), setloder(false)],
                      ];
                }}
              >
                {!loder ? (
                  "submit"
                ) : !imgurl ? (
                  <CircularProgress size={"2rem"} style={{ color: "white" }} />
                ) : (
                  "uploaded"
                )}
              </Button>
            </div>
            <div
              style={{
                flexWrap: "wrap",
                justifyContent: "space-between",
                padding: "20px",
                margin: "auto",
                alignItems: "center",
                display: "flex",
                gap: "15px",
              }}
            >
              <Button fullWidth type="submit" variant="contained">
                {!loder2 ? (
                  "Register"
                ) : (
                  <CircularProgress size={"2rem"} style={{ color: "white" }} />
                )}
              </Button>
              <Box
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "7900px",
                }}
              >
                <div></div>
                <Link
                  style={{ textDecoration: "none", color: "#1976D2" }}
                  to="/login"
                >
                  You already have an account? in CBHR
                </Link>
              </Box>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
}
