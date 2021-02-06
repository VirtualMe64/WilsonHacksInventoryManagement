import logo from "./logo.svg";
import React from "react";
import "./App.css";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import Navigation from "./Components/Navigation";

function App() {
  const [view, setView] = React.useState(0);
  return (
    <div
      className="App"
      style={{ width: "100vw", height: "100vh", backgroundColor: "#011627" }}
    >
      {view === 0 && <SignIn changeView={(v) => setView(v)} />}
      {view === 1 && <SignUp changeView={(v) => setView(v)} />}
      {view === 2 && <Navigation changeView={(v) => setView(v)} />}
    </div>
  );
}

export default App;
