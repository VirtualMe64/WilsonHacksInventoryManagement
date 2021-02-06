import { findByLabelText } from "@testing-library/react";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { createPortal } from "react-dom";

const item = (name, amount, date, unit) => {
  return { name: name, amount: amount, date: date, unit: unit };
};

const EditInventory = () => {
  const data = [
    item("Spicy Nuts", 2, "2/6/2021", "oz"),
    item("Sour Nuts", 3, "2/6/2021", "oz"),
    item("Sweet Nuts", 7, "2/6/2021", "oz"),
    item("Legume Soup", 1, "2/6/2021", "oz"),
    item("Valentine Special", 14, "2/6/2021", "oz"),
    item("Spicy Nuts", 2, "2/6/2021", "oz"),
    item("Sour Nuts", 3, "2/6/2021", "oz"),
    item("Sweet Nuts", 7, "2/6/2021", "oz"),
    item("Legume Soup", 1, "2/6/2021", "oz"),
    item("Valentine Special", 14, "2/6/2021", "oz"),
    item("Spicy Nuts", 2, "2/6/2021", "oz"),
    item("Sour Nuts", 3, "2/6/2021", "oz"),
    item("Sweet Nuts", 7, "2/6/2021", "oz"),
    item("Legume Soup", 1, "2/6/2021", "oz"),
    item("Valentine Special", 14, "2/6/2021", "oz"),
    item("Spicy Nuts", 2, "2/6/2021", "oz"),
    item("Sour Nuts", 3, "2/6/2021", "oz"),
    item("Sweet Nuts", 7, "2/6/2021", "oz"),
    item("Legume Soup", 1, "2/6/2021", "oz"),
    item("Valentine Special", 14, "2/6/2021", "oz"),
  ];

  return <div style={style.divStyle}>{data.map((item) => itemObj(item))}</div>;
};

const itemObj = (item) => {
  return (
    <div style={style.itemDivStyle}>
      <RowSection width={"20%"}>
        <h2 style={style.title}>{item.name}</h2>
      </RowSection>
      <RowSection width={"20%"}>
        <p>
          Amount: {item.amount} {item.unit}
        </p>
      </RowSection>
      <RowSection width={"20%"}>
        <p>Last Edited: {item.date}</p>
      </RowSection>
      <RowSection style={{ marginLeft: "auto", paddingRight: 20 }}>
        <button style={{ ...style.iconButton }}>
          <FontAwesomeIcon
            icon={faEdit}
            size="2x"
            color={"#FF9F1C"}
            backgroundColor={"#011627"}
          />
        </button>
      </RowSection>
    </div>
  );
};

const RowSection = (props) => {
  return (
    <div
      style={{
        ...props.style,
        display: "flex",
        flexDirection: "column",
        width: props.width,
        color: "#995D81",
        fontSize: 17,
      }}
    >
      {props.children}
    </div>
  );
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

export default EditInventory;
