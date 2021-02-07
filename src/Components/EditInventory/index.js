import { findByLabelText } from "@testing-library/react";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { createPortal } from "react-dom";

const item = (name, amount, date, unit, id) => {
  return { name: name, amount: amount, date: date, unit: unit, id: id };
};

const EditInventory = () => {
  const [data, setData] = React.useState([
    item("Spicy Nuts", 2, "2/6/2021", "oz", 1),
    item("Sour Nuts", 3, "2/6/2021", "oz", 2),
  ]);

  const updateField = (itemId, field, newValue) => {
    var temp = Array.from(data);
    var dataIndex = temp.findIndex((x) => x.id == itemId);
    temp[dataIndex][field] = newValue;
    setData(temp);
  };

  const addItem = (event) =>{
    var temp = Array.from(data);
    setData([]);
    temp.push(item("New Item", 0, "0/0/0000", "oz", new Date().getTime()));
    setData(temp);
    //console.log(data);
  }

  return (
    <div style={style.divStyle}>
      {data.map((item) => {
        console.log('a');
        return <ItemObj item = {item} updateField = {(itemId, field, newValue) => updateField(itemId, field, newValue)} key={item.id}/>})}

      <button style={style.floatingButton} onClick={() => addItem()}>
        <FontAwesomeIcon
              icon={faPlus}
            />
      </button>
    </div>
  );
};

const ItemObj = (props) => {
  let {item, updateField} = props;
  const [editing, setEditing] = React.useState(false);

  const toggleEditing = () => {
    setEditing(!editing);
  };

  const updateName = (event) => {
    updateField(item.id, "name", event.target.value);
  };

  const updateAmount = (event) => {
    updateField(item.id, "amount", event.target.value);
  };



  return (
    <div style={style.itemDivStyle}>
      <RowSection width={"20%"}>
        {!editing ? (
          <h2 style={style.title}>{item.name}</h2>
        ) : (
          <input
            style={{ ...style.input, ...style.title }}
            defaultValue={item.name}
            onChange={updateName}
          />
        )}
      </RowSection>
      <RowSection width={"20%"}>
        {!editing ? (
          <p>
            Amount: {item.amount} {item.unit}
          </p>
        ) : (
          <input
            defaultValue={item.amount}
            onChange={updateAmount}
            style={style.input}
          />
        )}
      </RowSection>
      <RowSection width={"20%"}>
        <p>Last Edited: {item.date}</p>
      </RowSection>
      <RowSection style={{ marginLeft: "auto", paddingRight: 20 }}>
        <button style={{ ...style.iconButton }} onClick={toggleEditing}>
          <FontAwesomeIcon
            icon={!editing ? faEdit : faSave}
            size="2x"
            color={"#FF9F1C"}
            backgroundcolor={"#011627"}
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
    borderBottomColor: "#2EC4B6",
  },
  input: {
    border: "none",
    borderBottomColor: "#995D81",
    borderBottomStyle: "solid",
    borderBottomWidth: 1,
    backgroundColor: "transparent",
    color: "#995D81",
    outline: "none",
    fontSize: 17,
    marginTop: 8,
    marginRight: 8,
  },
  floatingButton: {
    position: "absolute",
    bottom: 20 + "px",
    left: 20 + "px",
    width: 100 + "px",
    height: 100 + "px",
    borderRadius: 50,
    fontSize: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    outline: "none"
  }
};

export default EditInventory;
