import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [itemText, setItemText] = useState("");
  const [listItems, setListItems] = useState([]);

  const addItem = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5500/api/item", {
        item: itemText
      });
      console.log(response);
      setListItems(prev => [...prev, response.data]);
      setItemText("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getItemsList = async () => {
      try {
        const response = await axios.get("http://localhost:5500/api/items");
        setListItems(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getItemsList();
  }, []);

  const deleteItem = async (id) => {
    try{
      const response = await axios.delete(`http://localhost:5500/api/item/${id}`)
      const newListItems = listItems.filter(item => item._id !== id);
      setListItems(newListItems);
    } catch(err){
      console.log(err);
    }
  }


  return (
    <div className="App">
      <h1>Your To-do List</h1>
      <div className="top">
        <form className="form" onSubmit={(e) => addItem(e)}>
          <input
            type="text"
            placeholder="What would you like to do?"
            onChange={(e) => {
              setItemText(e.target.value);
            }}
            value={itemText}
          />
        </form>
        <button onClick={(e) => addItem(e)}>Add</button>
      </div>
      <div className="list-items">
        {listItems.map((item) => (
          <div className="item">
            <p className="description">{item.item}</p>
            <div className="item-buttons">
              <button className="update-item">Update</button>
              <button className="delete-item" onClick={() => {deleteItem(item._id)}}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
