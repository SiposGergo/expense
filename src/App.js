import React, { useState } from "react";
import AddItemForm from "./AddItemForm";
import Summary from "./Summary";
import ListItem from "./ListItem";

function App() {
  const [items, setItems] = useState([]);

  function remove(id) {
    setItems(items => items.filter(i => i.id !== id))
  }

  return (
    <div className="container-fluid">
      <div className="row my-2">
        <div className="col-md-8 my-2">
          <AddItemForm addNewItem={(item) => setItems([...items, item])} />
        </div>
        <div className="col-md-4 my-2">
          <Summary items={items} />
        </div>
      </div>
      <ul className="list-group">
        {items.map(i => <ListItem key={i.id} {...i} remove={remove} />)}
      </ul>
    </div>
  );
}

export default App;
