import { useState } from "react";
// import { FcGoogle } from 'react-icons/fc'
import styles from "./loggs.module.css";

import Router from "next/router";
import CircularProgress from "@mui/material/CircularProgress";

function App({ dispatchers }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, showError] = useState(false);
  const [progress, showProgress] = useState(false);

  const checkCredentials = () => {
    const { pathname } = Router;
    let conditions = false;
    let dispatcherValue;

    dispatchers.map((dispatcher) => {
      if (dispatcher.email === email && dispatcher.password === password) {
        dispatcherValue = dispatcher;
        console.log(dispatcher.name);
        conditions = true;
      }
    });
    if (conditions === true) {
      showProgress(true);
      Router.push({
        pathname: "/dashboard",
        query: { name: dispatcherValue.name },
      });
      console.log("Of course it is in the database");
    } else if (conditions === false) {
      console.log("it is not in database");

      showError(true);
      setTimeout(() => {
        showError(false);
      }, 4000);
    }
  };
  const loginFormHandler = (e) => {
    e.preventDefault();
    // console.log(dispatchers);
    checkCredentials();
  };

  return (
    <div className={styles["login-container"]}>
      <div className={styles["image-container"]}>
        <div className={styles["text-wrapper"]}>
          <h1>Welcome</h1>
          <h2>Taxi Dispatcher App</h2>
          <p style={{ marginTop: "10px" }}>Dispatcher's Page</p>
        </div>
        <img
          className={styles["img"]}
          src="https://media.istockphoto.com/photos/3d-yellow-taxi-picture-id492362277?k=20&m=492362277&s=612x612&w=0&h=Wn5nE7iq8UGuuk8OozQf90MuDdf-4IV0rLCS9ysUWkI="
        />
      </div>
      <div className={styles["form-panel"]}>
        <div className={styles["form-caption"]}>
          <h1 className={styles["login-label"]}>Login</h1>
          <p>Dispatcher's Page</p>
        </div>
        <form onSubmit={loginFormHandler} className={styles["form-container"]}>
          <div className={styles["form-control"]}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles["input"]}
            />
          </div>
          <div className={styles["form-control"]}>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles["input"]}
            />
          </div>
          {error && (
            <label
              style={{
                color: "red",
                fontSize: "17px",
              }}
            >
              Please check your credentials
            </label>
          )}
          {!error && progress && (
            <CircularProgress size={70} style={{ marginLeft: "150px" }} />
          )}

          <input
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: " 0.5rem 1rem",
              borderRadius: "2rem",
              border: "none",
              border: "1px solid #ccc",
              marginBottom: "1rem",
              background: "#ecc92c",
              border: "none",
              cursor: "pointer",
              padding: "1rem",
            }}
            type="submit"
            className={styles["button"]}
          />
          <div className={styles["additional-forms"]}>
            <a href="#">Forgot Password?</a>
            {/* <a href="#">Create Account</a> */}
          </div>
        </form>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const connection_string = "http://localhost:3000/api/";
  const headers = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  const [dispatchersDB] = await Promise.all([
    fetch(connection_string + "dispatchers", headers),
  ]);

  const dispatchersCollection = await dispatchersDB.json();
  const dispatchers = dispatchersCollection.dispatchers;

  return {
    props: {
      dispatchers,
    },
  };
}

export default App;
