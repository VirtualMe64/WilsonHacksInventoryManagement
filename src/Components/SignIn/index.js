import React from "react";
import FirebaseAPI from "../../FirebaseAPI";

const SignIn = (props) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const setters = {
    email: setEmail,
    password: setPassword,
  };

  var textChange = (event) => {
    var index = Object.keys(setters).findIndex((x) => x == event.target.name);
    Object.values(setters)[index](event.target.value);
  };

  var submitLogin = (event) => {
    signIn();
  };

  React.useEffect(() => {
    loadCredentials();
  }, []);

  var loadCredentials = () => {
    let creds = localStorage.getItem("credentials");
    try {
      creds = JSON.parse(creds);
      setEmail(creds.email);
      setPassword(creds.password);
      console.log("credentials loaded");
      signIn(creds.email, creds.password);
    } catch (err) {}
  };

  const saveCredentials = () => {
    let creds = JSON.stringify({ email: email, password: password });
    localStorage.setItem("credentials", creds);
  };

  const signIn = (e, p) => {
    FirebaseAPI.signIn({ email: e ? e : email, password: p ? p : password })
      .then(() => {
        console.log("signed in");
        saveCredentials();
        props.changeView(2);
      })
      .catch((err) => {
        setError(String(err));
      });
  };
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const isDisabled =
    email === "" || password === "" || !re.test(email) || password.length < 6;

  return (
    <div style={style.container}>
      <div style={style.main}>
        <h1 style={style.title}>Sign In</h1>
        <input
          name="email"
          id="email"
          value={email}
          onChange={textChange}
          type="email"
          placeholder="Email Address"
          style={style.input}
        />

        <input
          name="password"
          id="password"
          value={password}
          onChange={textChange}
          type="password"
          placeholder="Password"
          style={style.input}
        />
        <button
          type="submit"
          onClick={submitLogin}
          style={isDisabled ? style.buttonDisabled : style.button}
          disabled={isDisabled}
        >
          Sign In
        </button>
        <p style={style.error}>{error}</p>
        <div style={style.changeViewDiv}>
          <p style={style.changeViewP}>Dont have an account?</p>
          <button
            onClick={() => props.changeView(1)}
            style={style.changeViewButton}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

const style = {
  container: {
    backgroundColor: "#011627",
    width: "100vw",
    height: "100vh",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
  main: {
    border: "solid 1px #FDFFFC",
    padding: 20,
    borderRadius: 20,
    flexDirection: "column",
    display: "flex",
    width: 50 + "vw",
  },
  title: {
    color: "#2EC4B6",
    width: "100%",
    textAlign: "center",
  },
  input: {
    width: 100 + "%",
    border: "none",
    borderBottomColor: "#995D81",
    borderBottomStyle: "solid",
    borderBottomWidth: 1,
    backgroundColor: "transparent",
    color: "#995D81",
    outline: "none",
    fontSize: 17,
    marginTop: 8,
  },
  button: {
    width: 100 + "%",
    border: "none",
    backgroundColor: "#2EC4B6",
    color: "#FDFFFC",
    outline: "none",
    fontSize: 17,
    marginTop: 8,
    padding: 8,
    borderRadius: 10,
  },
  buttonDisabled: {
    width: 100 + "%",
    border: "none",
    backgroundColor: "#849695",
    color: "#FDFFFC",
    outline: "none",
    fontSize: 17,
    marginTop: 8,
    padding: 8,
    borderRadius: 10,
  },
  error: {
    color: "#FF9F1C",
    width: "100%",
    fontSize: 17,
    textAlign: "center",
  },
  changeViewDiv: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  changeViewP: {
    color: "#995D81",
    fontSize: 17,
  },
  changeViewButton: {
    backgroundColor: "transparent",
    outline: "none",
    color: "#2EC4B6",
    border: "none",
    fontWeight: "bold",
    fontSize: 17,
  },
};

export default SignIn;
