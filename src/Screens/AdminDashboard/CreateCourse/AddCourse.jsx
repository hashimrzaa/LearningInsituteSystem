import {
  Button,
  Box,
  Container,
  CssBaseline,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  useMediaQuery,
} from "@mui/material";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import React from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../Config/Firebase/Firebase";
import { useRef } from "react";

const AddCourse = () => {
  const matches = useMediaQuery("(max-width:730px)");

  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  let course = useRef();
  let Teacher = useRef();

  const sendData = (obj, colName) => {
    return new Promise((resolve, reject) => {
      addDoc(collection(db, colName), obj)
        .then((res) => {
          resolve("data send to db successfully");
        
        
        })
        .catch((err) => {
          reject(err);
          alert(err.code)
        });
    });
  };

  return (
    <div>
      <CssBaseline />

      <Container maxWidth="md">
        <div
          style={{
            backgroundColor: "rgb(255,255,255,0.7)",
            backdropFilter: "blur(16px)",
           
            borderRadius: "6px 6px 4px 4px",
            overflow: "auto",
          }}
        >
          <h1
            style={{
              margin: "0",
              padding: "10px",
              flexWrap: "wrap",
              textAlign: "center",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              alignItems: "center",
            }}
          >
            Add Course
            <LibraryAddIcon />
          </h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendData(
                {
                  Teacher: Teacher.current.value,
                  Days: age,
                  course: course.current.value,
                },
                "Courses"
              );
              setAge('')
              course.current.value = ''
              Teacher.current.value = ''
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
                inputRef={Teacher}
                autoComplete="off"
                required
                type="text"
                fullWidth
                id="a"
                label="Who teach this course"
                variant="outlined"
              />

              <FormControl fullWidth>
                <InputLabel id="Week days">Week days</InputLabel>
                <Select
                required
                  labelId="Week days"
                  id="Week days"
                  value={age}
                  label="Week days"
                  onChange={handleChange}
                >
                  <MenuItem value={"MWF"}>MWF</MenuItem>
                  <MenuItem value={"TTS"}>TTS</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div
              style={{
                flexWrap: "wrap",

                padding: "20px",
                margin: "auto",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                gap: "40px",
              }}
            >
              <TextField
                inputRef={course}
                autoComplete="off"
                required
                fullWidth
                type="text"
                label="Course name"
                variant="outlined"
              />
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
                Register
              </Button>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default AddCourse;
