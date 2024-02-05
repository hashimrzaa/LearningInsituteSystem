import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../Config/Firebase/Firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { CircularProgress, Modal } from "@mui/material";
import { useState } from "react";

const defaultTheme = createTheme();
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

export default function Login() {
  // useState
  // loader
  const [loader, setloader] = useState(false);
  // modal
  const [modaltext, setmodaltext] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // navigation

  const navigate = useNavigate();

  // user login
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    loginUser({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  // user login function
  let data = false;

  let loginUser = (obj) => {
    setloader(true);
    return new Promise((resolve, reject) => {
      signInWithEmailAndPassword(auth, obj.email, obj.password)
        .then(async () => {
          const q = query(
            collection(db, "users"),
            where("id", "==", auth.currentUser.uid)
          );

          // user data get
          const querySnapshot = await getDocs(q);

          querySnapshot.forEach((doc) => {
            data = true;
            return doc.data().type === "admin"
              ? navigate("/adminpannel")
              : navigate(`/singlecourse/${doc.data().Course.course}`);
          });
         
          setloader(false)
          !loader
        ? [(setmodaltext('you  eliminate the course'), handleOpen())]:null

        })
        .catch((err) => {
          reject(err);
          setloader(false)[(setmodaltext(err.message), handleOpen())];
        });
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
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
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <h1
            style={{
              justifyContent: "center",
              fontSize: "25px",
              backgroundColor: "#1976d2",
              margin: "0",
              padding: "30px",
              display: "flex",
              width: "100%",
              color: "white",
            }}
          >
            CBHR
          </h1>
          <Box
            sx={{
              mx: 4,
              my: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                type="email"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {!loader ? (
                  "Sign in"
                ) : (
                  <CircularProgress size={"2rem"} style={{ color: "white" }} />
                )}
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2"></Link>
                </Grid>
                <Grid item>
                  <Link
                    to="/admissionform"
                    style={{ textDecoration: "none", color: "#1976D2" }}
                  >
                    {"Don't have an account? in CBHR"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
