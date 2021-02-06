import { findByLabelText } from "@testing-library/react";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { createPortal } from "react-dom";
import EditInventory from "../EditInventory";

const Navigation = () => {
  return <EditInventory />;
};

const style = {
  divStyle: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#011627",
    height: "100vh",
    overflowX: "hidden",
    overflowY: "scroll",
  },
  itemDivStyle: {
    //flexGrow: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    border: "solid 1px #FDFFFC",
    borderRadius: 20,
    padding: 8,
    margin: 8,
    height: "40px",
  },
  iconButton: {
    backgroundColor: "#011627",
    border: "none",
    outline: "none",
  },
  title: {
    color: "#2EC4B6",
  },
};

export default Navigation;
