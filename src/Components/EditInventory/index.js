import { findByLabelText } from "@testing-library/react";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faStickyNote,
  faWindowRestore,
} from "@fortawesome/free-solid-svg-icons";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { createPortal } from "react-dom";
import FirebaseAPI from "../../FirebaseAPI";
import Sorting from "./Sorting";

const item = (name, amount, date, unit, id, warning, max) => {
  return {
    name: name,
    amount: amount,
    date: date,
    unit: unit,
    id: id,
    warning: warning ? warning : 0,
    max: max ? max : amount,
  };
};
const units = ["oz", "lbs"];

var getDate = (date) => {
  var currentdate = new Date(date);
  var out =
    currentdate.getDate() +
    "/" +
    (currentdate.getMonth() + 1) +
    "/" +
    currentdate.getFullYear() +
    " @ " +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes() +
    ":" +
    currentdate.getSeconds();
  return out;
};

export { getDate, units, item };

const EditInventory = (props) => {
  const [data, setData] = React.useState([
    item("Tumeric-Chili Almond and Cashew", 2, getDate(), "oz", 1),
    item("Tumeric-Chili Cashew", 3, getDate(), "oz", 2),
    item("Savory Pecan", 12, getDate(), "oz", 3),
    item("Chili Pecan", 17, getDate(), "oz", 4),
    item("Boso Maple Dipped Pecans", 3, getDate(), "oz", 5),
    item("Vanilla Candied Almond", 45, getDate(), "oz", 6),
    item("Candied Red Peanuts", 93, getDate(), "oz", 7),
    item("Honey Chipotle Peanut", 54, getDate(), "oz", 8),
    item("Eight Snack Bags Variety Pack", 54, getDate(), "oz", 9),
  ]);

  const [searchBarInput, setSearchBarInput] = React.useState("");

  const updateField = (itemId, field, newValue) => {
    var temp = Array.from(data);
    var dataIndex = temp.findIndex((x) => x.id == itemId);
    temp[dataIndex][field] = newValue;
    setData(temp);
    console.log("HERE");
    editData(data[dataIndex]);
  };

  const getData = () => {
    let vals = [];
    FirebaseAPI.getItems().then((data) => {
      data.forEach((element) => {
        vals.push(
          item(
            element.name,
            element.amount,
            element.date,
            element.unit,
            element.id,
            element.warning,
            element.max
          )
        );
      });
      console.log("JSON: " + JSON.stringify(vals));
      setData(vals);
    });
  };

  const editData = (data) => {
    let editedItem = data;
    let id = editedItem.id;
    delete editedItem.id;
    if (editedItem.amount > editedItem.max) {
      editedItem.max = editedItem.amount;
    }
    console.log("Update JSON: " + JSON.stringify(editedItem));
    FirebaseAPI.editItem(editedItem, id).then(() => {
      console.log("added item");
    });
  };

  React.useEffect(() => {
    getData();
    FirebaseAPI.listener((snap) => {
      let vals = [];
      snap.forEach((element) => {
        vals.push(
          item(
            element.name,
            element.amount,
            element.date,
            element.unit,
            element.id,
            element.warning,
            element.max
          )
        );
      });
      setData(vals);
    });
  }, []);

  const addItem = (name, amount, unit, warning) => {
    //var temp = Array.from(data);
    var newItem = {
      name: name,
      amount: parseFloat(amount),
      date: new Date().getTime(),
      unit: unit,
      warning: parseFloat(warning),
      max: parseFloat(amount),
    };
    //temp.push(newItem);
    FirebaseAPI.addItem(newItem).then(() => {
      console.log("added item");
    });

    //setData(temp);
    //console.log(data);
  };

  const deleteItem = (id) => {
    var item = data.find((x) => x.id == id);
    if (
      window.confirm("Are you sure you want to delete this item: " + item.name)
    ) {
      FirebaseAPI.removeItem(item);
    }
  };

  const [showDiag, setShowDiag] = React.useState(false);

  const handleSearchBarChange = (event) => {
    setSearchBarInput(event.target.value);
  };
  const [sortMethod, changeSort] = React.useState(() => (a, b) => {
      if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
      if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
      return 0;
  })

  return (
    <div style={style.divStyle}>
      <Sorting sortFunction={changeSort}/>
      {data
        .filter(
          (x) =>
            searchBarInput == "" ||
            x.name.toLowerCase().indexOf(searchBarInput.toLowerCase()) != -1
        )
        .sort(sortMethod)
        .map((item) => {
          console.log("a");
          return (
            <ItemObj
              saveEdits={(id) => editData(data.find((x) => x.id === id))}
              item={item}
              updateField={(itemId, field, newValue) =>
                updateField(itemId, field, newValue)
              }
              deleteItemMethod={(id) => deleteItem(id)}
              key={item.id}
            />
          );
        })}

      <input
        style={style.searchBar}
        placeholder="Search"
        value={searchBarInput}
        onChange={handleSearchBarChange}
      ></input>

      <button style={style.floatingButton} onClick={() => setShowDiag(true)}>
        <FontAwesomeIcon icon={faPlus} size="4x" color={"#011627"} />
      </button>

      {showDiag && (
        <NewItemDialogue
          cancel={() => setShowDiag(false)}
          createItem={addItem}
        />
      )}
    </div>
  );
};

const ItemObj = (props) => {
  let { item, updateField } = props;
  const [editing, setEditing] = React.useState(false);
  var initialAmount = item.amount;

  const toggleEditing = () => {
    if (editing) {
      props.saveEdits(item.id);
    } else {
      initialAmount = item.amount;
    }
    setEditing(!editing);
  };

  const addAmount = (amountToAdd) => {
    updateField(
      item.id,
      "amount",
      (Math.round(100 * parseFloat(item.amount)) +
        Math.round(100 * parseFloat(amountToAdd))) /
        100
    );
    if (amountToAdd !== 0) {
      updateField(item.id, "date", new Date().getTime());
    }
  };

  const updateName = (event) => {
    updateField(item.id, "name", event.target.value);
    updateField(item.id, "date", new Date().getTime());
  };

  const updateAmount = (event) => {
    var newAmount = parseFloat(event.target.value);
    var amountToUse = initialAmount;
    if (!isNaN(newAmount)) {
      amountToUse = Math.round(100 * newAmount) / 100;
    }
    updateField(item.id, "amount", amountToUse);
    updateField(item.id, "date", new Date().getTime());
  };

  const updateUnit = (event) => {
    updateField(item.id, "unit", event.target.value);
    updateField(item.id, "date", new Date().getTime());
  };

  const deleteItem = () => {
    props.deleteItemMethod(item.id);
  };

  return (
    <div style={style.itemDivStyle}>
      <RowSection width={"20%"}>
        {!editing ? (
          <h2 style={{ ...style.title }}>{item.name}</h2>
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
            Amount: {item.amount} {item.unit}{" "}
            {Math.round((item.amount / item.max) * 100)}%
          </p>
        ) : (
          <div style={style.amountQuantityDiv}>
            <input
              type="number"
              pattern="\d*"
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
      <RowSection width={"30%"}>
        <p>Last Edited: {getDate(item.date)}</p>
      </RowSection>
      <RowSection width={"20%"}>
        <AddValueForm addAmountFunction={addAmount} />
      </RowSection>
      <RowSection style={{ marginLeft: "auto", paddingRight: 20 }}>
        <div
          style={{
            margin: 0,
            padding: 0,
            display: "flex",
            flexDirection: "row",
          }}
        >
          {editing && (
            <button
              style={{ marginRight: 10, ...style.iconButton }}
              onClick={deleteItem}
            >
              <FontAwesomeIcon icon={faTrash} size="2x" color="#995D81" />{" "}
            </button>
          )}
          <button style={{ ...style.iconButton }} onClick={toggleEditing}>
            <FontAwesomeIcon
              icon={!editing ? faEdit : faSave}
              size="2x"
              color={"#FF9F1C"}
              backgroundcolor={"#011627"}
            />
          </button>
        </div>
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
        padding: 8,
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
      alert("Invalid input: negative number");
      setInputValue(0);
    } else {
      props.addAmountFunction(Math.round(sign * value * 100) / 100);
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
          color="#2EC4B6"
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
          color="#995D81"
          backgroundColor="#011627"
        />{" "}
      </button>
    </div>
  );
};

export { AddValueForm };
const NewItemDialogue = (props) => {
  const [name, setName] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [warning, setWarning] = React.useState("");
  const [drop, setDrop] = React.useState("");

  return (
    <div style={dialogueStyle.main}>
      <div style={dialogueStyle.container}>
        <h1 style={dialogueStyle.title}>New Inventory Item</h1>
        <input
          name="name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Name"
          style={style.input}
          autoComplete="off"
        />
        <input
          name="amount"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          placeholder="Amount"
          pattern="\d*"
          style={{ ...style.input, color: "#995D81", marginBottom: 8 }}
          autoComplete="off"
        />
        <input
          name="warning"
          id="warning"
          value={warning}
          onChange={(e) => setWarning(e.target.value)}
          type="text"
          placeholder="Warning Threshold"
          pattern="\d+"
          style={{ ...style.input, color: "#995D81", marginBottom: 8 }}
          autoComplete="off"
        />
        <select
          name="Units"
          style={style.dropDown}
          onChange={(e) => setDrop(e.target.value)}
          value={drop}
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
        <button
          onClick={() => {
            var initAmount = parseFloat(amount);
            var amountToUse = 0;
            if (!isNaN(initAmount)) {
              amountToUse = Math.round(100 * amount) / 100;
            }
            props.createItem(name, amountToUse, drop, warning);
            props.cancel();
          }}
          style={false ? dialogueStyle.buttonDisabled : dialogueStyle.button}
          disabled={false}
        >
          Create
        </button>
        <button
          onClick={() => {
            props.cancel();
          }}
          style={{ ...dialogueStyle.button, backgroundColor: "#995d81" }}
          disabled={false}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
const dialogueStyle = {
  main: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  container: {
    width: "50%",
    justifyContent: "center",
    backgroundColor: "#011627",
    border: "solid 1px 3",
    borderRadius: 20,
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    padding: 16,
    boxShadow: "-2px 2px 10px 1px grey",
  },
  title: {
    color: "#2EC4B6",
    width: "100%",
    textAlign: "center",
    //margin: 8,
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
};

const style = {
  divStyle: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#011627",
  },
  itemDivStyle: {
    //flexGrow: 1,
    minHeight: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    border: "solid 1px #FDFFFC",
    borderRadius: 20,
    padding: 8,
    margin: 8,
    justifyContent: "center",
    //minHeight: 100,
  },
  iconButton: {
    backgroundColor: "#011627",
    border: "none",
    outline: "none",
  },
  title: {
    color: "#2EC4B6",
    borderBottomColor: "#2EC4B6",
    margin: 0,
    padding: 0,
    width: "100%",
    overflow: "hidden",
    //whiteSpace: "nowrap",
    overflowWrap: "break-word",
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
  searchBar: {
    position: "absolute",
    left: "50%",
    top: "2.7%",
    transform: "translateX(-50%)",
    height: 35,
    width: "25%",
    passing: "10px",
    border: "none",
    outline: "none",
    borderRadius: "15px",
    textAlign: "center",
    fontSize: 20,
    color: "#011627",
    backgroundColor: "#2EC4B6",
  },
  floatingButton: {
    position: "absolute",
    bottom: 20 + "px",
    left: 20 + "px",
    width: 60 + "px",
    height: 60 + "px",
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    outline: "none",
    border: "none",
    backgroundColor: "#2EC4B6",
    boxShadow: "-2px 2px 10px 3px #011627",
  },
  dropDown: {
    backgroundColor: "#011627",
    color: "#995D81",
    borderColor: "#995D81",
    outline: "none",
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
