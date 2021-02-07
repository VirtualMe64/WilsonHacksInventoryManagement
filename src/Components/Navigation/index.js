import { findByLabelText } from "@testing-library/react";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxes } from "@fortawesome/free-solid-svg-icons";
import { faTachometerAlt } from "@fortawesome/free-solid-svg-icons";
import { createPortal } from "react-dom";
import EditInventory from "../EditInventory";

const Navigation = () => {
  const [view, setView] = React.useState(0);
  return (
    <div style={style.main}>
      <div style={style.barContainer}>
        <button
          style={{
            ...style.barButtons,
            backgroundColor: view === 0 ? "#2EC4B6" : "#011627",
            borderColor: view === 0 ? "#2EC4B6" : "#2EC4B6",
          }}
          onClick={() => setView(0)}
        >
          <FontAwesomeIcon
            icon={faBoxes}
            size="4x"
            color={view === 0 ? "#011627" : "#2EC4B6"}
          />
        </button>
        <button
          style={{
            ...style.barButtons,
            backgroundColor: view === 1 ? "#2EC4B6" : "#011627",
            borderColor: view === 1 ? "#2EC4B6" : "#2EC4B6",
          }}
          onClick={() => setView(1)}
        >
          <FontAwesomeIcon
            icon={faTachometerAlt}
            size="4x"
            color={view === 1 ? "#011627" : "#2EC4B6"}
          />
        </button>
      </div>
      <div style={style.content}>
        {view === 0 && <EditInventory height={"calc(100vh-100px)"} />}
      </div>
    </div>
  );
};

const style = {
  barContainer: {
    width: "100vw",
    display: "flex",
    flexDirection: "row",
    borderBottom: "1px solid #a9a9a9",
  },
  barButtons: {
    margin: 8,
    border: "none",
    outline: "none",
    padding: 8,
    borderRadius: 15,
    borderWidth: 1,
    borderStyle: "solid",
  },
  main: {
    overflow: "hidden",
    height: "100vh",
  },
  content: {
    overflowY: "scroll",
    height: "90vh",
  },
};

export default Navigation;
