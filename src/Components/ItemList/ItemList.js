import "./ItemList.scss";
import { useState } from "react";
import { nanoid } from "nanoid";
import { Form } from "react-bootstrap";

import ItemCard from "../ItemCard/ItemCard";

const Items = ({ items }) => {
  let itemsCopy = [...items];

  const [search, setSearch] = useState("");

  if (search === "") {
    itemsCopy = items;
  } else {
    const filteredItems = items.filter((item) => {
      if (item.name.toLowerCase().includes(search.toLowerCase())) {
        return item;
      }
      return null;
    });
    itemsCopy = filteredItems;
  }

  return (
    <section className="items-list-container">
      <Form className="items-list-searchbar">
        <Form.Group controlId="formBasicSearch">
          <Form.Control
            type="text"
            placeholder="Input Item Name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Form.Group>
      </Form>

      <div className="items-list">
        {itemsCopy.map((item) => (
          <ItemCard key={nanoid()} item={item} />
        ))}
      </div>
    </section>
  );
};

export default Items;
