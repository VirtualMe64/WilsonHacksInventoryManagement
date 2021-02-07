import { findByLabelText } from "@testing-library/react";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faStickyNote } from "@fortawesome/free-solid-svg-icons";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { createPortal } from "react-dom";
import FirebaseAPI from "../../FirebaseAPI";
import { getDate, item, units, AddValueForm } from "../EditInventory";

const Dashboard = (props) => {
  const [data, setData] = React.useState([]);
  const [d2Data, setD2Data] = React.useState([[[]]]);
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
            element.warning
          )
        );
      });
      setData(vals);
      console.log("new data");
    });
  }, []);

  const editData = (data) => {
    let editedItem = data;
    let id = editedItem.id;
    delete editedItem.id;
    editedItem.date = new Date().getTime();
    console.log("Update JSON: " + JSON.stringify(editedItem));
    FirebaseAPI.editItem(editedItem, id).then(() => {
      console.log("added item");
    });
  };

  const updateField = (itemId, field, newValue) => {
    var temp = Array.from(data);
    var dataIndex = temp.findIndex((x) => x.id == itemId);
    temp[dataIndex][field] = newValue;
    setData(temp);
    console.log("HERE");
    editData(data[dataIndex])
  };

  React.useEffect(() => {
    let t = [];
    let f = [];
    for (var i = 0; i < data.length; i++) {
      if (data[i].amount <= data[i].warning) {
        f.push(data[i]);
        console.log("adding f item");
      }
    }
    t.push(f);
    let k = [];
    for (var i = 0; i < data.length; i++) {
      try {
        if (
          data[i].amount < data[i].warning + data[i].warning * 0.25 &&
          data[i].amount > data[i].warning
        ) {
          k.push(data[i]);
        }
      } catch (err) {
        console.log(err);
      }
    }
    t.push(k);

    for (var s = 0; s < t.length; s++) {
      let r = [];
      for (var i = 0; i < t[s].length; i += 4) {
        let h = [];
        for (var j = i; j < i + 4 && j < t[s].length; j++) {
          h.push(t[s][j]);
        }
        r.push([...h]);
      }
      t[s] = r;
    }

    setD2Data(t);
    console.log("2d: " + JSON.stringify(t));
  }, [data]);

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
            element.warning
          )
        );
      });
      console.log("JSON: " + JSON.stringify(vals));
      setData(vals);
    });
  };

  return (
    <div style={style.divStyle}>
      {d2Data[0].length > 0 &&
        d2Data.map((i, index) => {
          return (
            <div style={style.section}>
              <h1 style={style.sectionTitle}>
                {index === 0 ? "Warning Level Low" : "Level Aproaching Low"}
              </h1>
              {i.map((r, index) => {
                console.log("r: " + JSON.stringify(r));
                return (
                  <div style={style.row}>
                    {r.map((item, index) => {
                      return (
                        <ItemObj
                          item={item}
                          updateField={updateField}
                          saveEdits={(id) => {
                            console.log("editing data");
                            editData(data.find((x) => x.id === item.id));
                          }}
                        />
                      );
                    })}
                  </div>
                );
              })}
            </div>
          );
        })}
    </div>
  );
};

const ItemObj = (props) => {
  let { item, updateField } = props;
  const [editing, setEditing] = React.useState(false);

  const toggleEditing = () => {
    if (editing) {
      props.saveEdits(item.id);
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
    updateField(item.id, "date", new Date());
  };

  const updateName = (event) => {
    updateField(item.id, "name", event.target.value);
    updateField(item.id, "date", new Date());
  };

  const updateAmount = (event) => {
    updateField(item.id, "amount", event.target.value);
    updateField(item.id, "date", new Date());
  };

  const updateUnit = (event) => {
    updateField(item.id, "unit", event.target.value);
    updateField(item.id, "date", new Date());
  };

  return (
    <div style={style.itemDivStyle}>
      {!editing ? (
        <h2 style={{ ...style.title }}>{item.name}</h2>
      ) : (
        <input
          style={{ ...style.input, ...style.title }}
          defaultValue={item.name}
          onChange={updateName}
        />
      )}
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
      <p>Last Edited: {getDate(item.date)}</p>
      <AddValueForm addAmountFunction={addAmount} />
    </div>
  );
};

const style = {
  divStyle: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#011627",
  },
  section: {
    display: "flex",
    flexDirection: "column",
  },
  sectionTitle: {
    width: "100%",
    textAlign: "left",
    marginLeft: 16,
    color: "#2EC4B6",
  },
  row: {
    flexDirection: "row",
    display: "flex",
  },

  itemDivStyle: {
    //flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "solid 1px #FDFFFC",
    borderRadius: 20,
    padding: 8,
    margin: 8,
    justifyContent: "center",
    color: "#995D81",
    width: "22%",
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
    wordWrap: "break-word",
    overflow: "hidden",
    width: "100%",
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
  searchBarDiv: {
    margin: 0,
    padding: 0,
    top: "3%",
    width: "100vw",
    position: "absolute",
  },
  searchBar: {
    height: 35,
    width: "25%",
    marginLeft: "auto",
    marginRight: "auto",
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

export default Dashboard;
