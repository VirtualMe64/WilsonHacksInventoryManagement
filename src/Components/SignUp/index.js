import React from "react";
import FirebaseAPI from "../../FirebaseAPI";

const SignUp = (props) => {
  const [email, setEmail] = React.useState("");
  const [password1, setPassword1] = React.useState("");
  const [password2, setPassword2] = React.useState("");
  const [error, setError] = React.useState("");

  const setters = {
    email: setEmail,
    password1: setPassword1,
    password2: setPassword2,
  };

  var textChange = (event) => {
    var index = Object.keys(setters).findIndex((x) => x == event.target.name);
    Object.values(setters)[index](event.target.value);
  };

  var submitSignup = (event) => {
    signUp();
  };
  const signUp = () => {
    FirebaseAPI.createUser({ email: email, password: password1 })
      .then(() => {
        console.log("signed in");
        props.changeView(2);
      })
      .catch((err) => {
        setError(String(err));
      });
  };
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const isDisabled =
    password1 !== password2 ||
    password1 === "" ||
    !re.test(email) ||
    password1.length < 6;

  return (
    <div style={style.container}>
      <div style={style.main}>
        <h1 style={style.title}>Sign Up</h1>
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
          name="password1"
          id="password"
          value={password1}
          onChange={textChange}
          type="password"
          placeholder="Password"
          style={style.input}
        />
        <input
          name="password2"
          id="password2"
          value={password2}
          onChange={textChange}
          type="password"
          placeholder="Password Again"
          style={style.input}
        />
        <button
          type="submit"
          onClick={submitSignup}
          disabled={isDisabled}
          style={isDisabled ? style.buttonDisabled : style.button}
        >
          Create Account
        </button>
        <p style={style.error}>{error}</p>
        <p style={style.error}>{error}</p>
        <div style={style.changeViewDiv}>
          <p style={style.changeViewP}>Already have an account?</p>
          <button
            onClick={() => props.changeView(0)}
            style={style.changeViewButton}
          >
            Sign In
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

export default SignUp;
