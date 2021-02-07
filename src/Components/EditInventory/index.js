import { findByLabelText } from "@testing-library/react";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faStickyNote } from "@fortawesome/free-solid-svg-icons";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { createPortal } from "react-dom";

const item = (name, amount, date, unit, id) => {
  return { name: name, amount: amount, date: date, unit: unit, id: id };
};

const EditInventory = () => {
  const [data, setData] = React.useState([
    item("Spicy Nuts", 2, "2/6/2021", "oz", 1),
    item("Sour Nuts", 3, "2/6/2021", "oz", 2),
    item("Sweet Nuts", 7, "2/6/2021", "oz", 3),
    item("Legume Soup", 1, "2/6/2021", "oz", 4),
    item("Valentine Special", 14, "2/6/2021", "oz", 5),
    item("Spicy Nuts", 2, "2/6/2021", "oz", 6),
    item("Sour Nuts", 3, "2/6/2021", "oz", 7),
    item("Sweet Nuts", 7, "2/6/2021", "oz", 8),
    item("Legume Soup", 1, "2/6/2021", "oz", 9),
    item("Valentine Special", 14, "2/6/2021", "oz", 10),
    item("Spicy Nuts", 2, "2/6/2021", "oz", 11),
    item("Sour Nuts", 3, "2/6/2021", "oz", 12),
    item("Sweet Nuts", 7, "2/6/2021", "oz", 13),
    item("Legume Soup", 1, "2/6/2021", "oz", 14),
    item("Valentine Special", 14, "2/6/2021", "oz", 15),
    item("Spicy Nuts", 2, "2/6/2021", "oz", 16),
    item("Sour Nuts", 3, "2/6/2021", "oz", 17),
    item("Sweet Nuts", 7, "2/6/2021", "oz", 18),
    item("Legume Soup", 1, "2/6/2021", "oz", 19),
    item("Valentine Special", 14, "2/6/2021", "oz", 20),
  ]);

  const updateField = (itemId, field, newValue) => {
    var temp = Array.from(data);
    var dataIndex = temp.findIndex((x) => x.id == itemId);
    temp[dataIndex][field] = newValue;
    setData(temp);
    console.log("HERE");
  };

  return (
    <div style={style.divStyle}>
      {data.map((item) => {
        console.log("AAAA");
        return ItemObj(item, updateField)
      })}
    </div>
  );
};

const ItemObj = (item, updateItemFunction) => {
  const [editing, setEditing] = React.useState(false);

  const units = ["oz", "lbs"]

  const toggleEditing = () => {
    setEditing(!editing);
  };

  const addAmount = (amountToAdd) => {
    updateItemFunction(item.id, "amount", parseInt(item.amount) + parseInt(amountToAdd))
  }

  const updateName = (event) => {
    updateItemFunction(item.id, "name", event.target.value);
  };

  const updateAmount = (event) => {
    updateItemFunction(item.id, "amount", event.target.value);
  };

  const updateUnit = (event) => {
    updateItemFunction(item.id, "unit", event.target.value);
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
          <div style={ style.amountQuantityDiv }>
            <input
              defaultValue={item.amount}
              onChange={updateAmount}
              style={style.input}
            />
            <select name = "Units" style = { style.dropDown } defaultValue = {item.unit} onChange = {updateUnit}>
              <option key = "None" value="" style = { style.dropDownOption }>None</option>
              {
              units.map((unit) => {
                return <option key = {unit} value={unit} style = { style.dropDownOption }>{unit}</option>;
              })
              }
            </select>

          </div>
        )}
      </RowSection>
      <RowSection width={"20%"}>
        <p>Last Edited: {item.date}</p>
      </RowSection>
      <RowSection width={"20%"}>
        <AddValueForm addAmountFunction = {addAmount} />
      </RowSection>
      <RowSection style={{ marginLeft: "auto", paddingRight: 20 }}>
        <button style={{ ...style.iconButton }} onClick={toggleEditing}>
          <FontAwesomeIcon
            icon={!editing ? faEdit : faSave}
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

const AddValueForm = (props) => {
  const [inputValue, setInputValue] = React.useState(0);

  const onChange = (event) => {
    setInputValue(event.target.value)
  }

  const addValue = () => {
    props.addAmountFunction(inputValue)
    setInputValue(0);
  }

  const subtractValue = () => {
    props.addAmountFunction(-1 * inputValue)
    setInputValue(0);
  }

  return (
    <div>
      <button style={ style.iconButton } onClick = {addValue}> <FontAwesomeIcon
        icon={faPlus}
        size="2x"
        color="#1ced4a"
        backgroundColor="#011627"
      /> </button>
      <input style = {{ textAlign: "center", width:"20%", ...style.input }} type = "number"
      onChange = {onChange} value = {inputValue}>
      </input>
      <button style={ style.iconButton } onClick = {subtractValue}> <FontAwesomeIcon
        icon={faMinus}
        size="2x"
        color="#e02b34"
        backgroundColor="#011627"
      /> </button>
    </div>
  )
}

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
  dropDown: {
    backgroundColor: "transparent",
    color: "#995D81",
    borderColor: "#995D81",
  },
  dropDownOption: {
    backgroundColor: "#011627",
    color: "#995D81",
  },
  amountQuantityDiv: {
    display: "flex",
    flexDirection: "row",
  }
};

export default EditInventory;
