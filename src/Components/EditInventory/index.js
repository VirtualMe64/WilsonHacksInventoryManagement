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

var getDate = () => {
  var currentdate = new Date();
  var out = currentdate.getDate() + "/"
  + (currentdate.getMonth()+1)  + "/" 
  + currentdate.getFullYear() + " @ "  
  + (currentdate.getHours() < 10 ? ("0" + currentdate.getHours()) : currentdate.getHours()) + ":"  
  + (currentdate.getMinutes() < 10 ? ("0" + currentdate.getMinutes()) : currentdate.getMinutes()) + ":" 
  + (currentdate.getSeconds() < 10 ? ("0" + currentdate.getSeconds()) : currentdate.getSeconds());
  return(out);
}

const EditInventory = (props) => {
  const [data, setData] = React.useState([
    item("Spicy Nuts", 2, getDate(), "oz", 1),
    item("Sour Nuts", 3, getDate(), "oz", 2),
  ]);

  const updateField = (itemId, field, newValue) => {
    var temp = Array.from(data);
    var dataIndex = temp.findIndex((x) => x.id == itemId);
    temp[dataIndex][field] = newValue;
    setData(temp);
    console.log("HERE");
  };

  const addItem = (event) => {
    var temp = Array.from(data);
    setData([]);
    temp.push(item("New Item", 0, getDate(), "oz", new Date().getTime()));
    setData(temp);
    //console.log(data);
  };

  return (
    <div style={style.divStyle}>
      {data.map((item) => {
        console.log("a");
        return (
          <ItemObj
            item={item}
            updateField={(itemId, field, newValue) =>
              updateField(itemId, field, newValue)
            }
            key={item.id}
          />
        );
      })}

      <button style={style.floatingButton} onClick={() => addItem()}>
        <FontAwesomeIcon icon={faPlus} />
      </button>

      <NewItemDialogue />
    </div>
  );
};

const ItemObj = (props) => {
  let { item, updateField } = props;
  const [editing, setEditing] = React.useState(false);

  const units = ["oz", "lbs"];

  const toggleEditing = () => {
    setEditing(!editing);
  };

  const addAmount = (amountToAdd) => {
    updateField(item.id, "amount", (Math.round(100 * parseFloat(item.amount)) + Math.round(100 * parseFloat(amountToAdd))) / 100)
    updateField(item.id, "date", getDate())
  }

  const updateName = (event) => {
    updateField(item.id, "name", event.target.value);
    updateField(item.id, "date", getDate())
  };

  const updateAmount = (event) => {
    updateField(item.id, "amount", event.target.value);
    updateField(item.id, "date", getDate());
  };

  const updateUnit = (event) => {
    updateField(item.id, "unit", event.target.value);
    updateField(item.id, "date", getDate());
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
          <div style={style.amountQuantityDiv}>
            <input
              defaultValue={item.amount}
              onChange={updateAmount}
              style={style.input}
            />
            <select
              name="Units"
              style={style.dropDown}
              defaultValue={item.unit}
              onChange={updateUnit}
            >
              <option key="None" value="" style={style.dropDownOption}>
                None
              </option>
              {units.map((unit) => {
                return (
                  <option key={unit} value={unit} style={style.dropDownOption}>
                    {unit}
                  </option>
                );
              })}
            </select>
          </div>
        )}
      </RowSection>
      <RowSection width={"20%"}>
        <p>Last Edited: {item.date}</p>
      </RowSection>
      <RowSection width={"20%"}>
        <AddValueForm addAmountFunction={addAmount} />
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

const AddValueForm = (props) => {
  const [inputValue, setInputValue] = React.useState(0);

  const onChange = (event) => {
    setInputValue(event.target.value);
  };

  const addAmount = (sign, value) => {
    if (isNaN(parseFloat(value))) {
      alert("Invalid input!");
      setInputValue(0);
    } else if (parseFloat(value) < 0) {
      alert("Invalid input: negative number")
      setInputValue(0);
    } else {
      props.addAmountFunction(Math.round((sign * value) * 100) / 100);
    }
  };

  const addValue = () => {
    addAmount(1, inputValue);
  };

  const subtractValue = () => {
    addAmount(-1, inputValue);
  };

  return (
    <div>
      <button style={style.iconButton} onClick={addValue}>
        {" "}
        <FontAwesomeIcon
          icon={faPlus}
          size="2x"
          color="#1ced4a"
          backgroundColor="#011627"
        />{" "}
      </button>
      <input
        style={{ textAlign: "center", width: "20%", ...style.input }}
        type="number"
        min={0}
        pattern="\d+"
        onChange={onChange}
        value={inputValue}
      ></input>
      <button style={style.iconButton} onClick={subtractValue}>
        {" "}
        <FontAwesomeIcon
          icon={faMinus}
          size="2x"
          color="#e02b34"
          backgroundColor="#011627"
        />{" "}
      </button>
    </div>
  );
};

const style = {
  divStyle: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#011627",
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
    outline: "none",
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
  },
};

export default EditInventory;
