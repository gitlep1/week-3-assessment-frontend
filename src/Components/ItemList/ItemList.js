import "./ItemList.scss";
import { useState, useMemo } from "react";
import { nanoid } from "nanoid";
import { Form } from "react-bootstrap";

import ItemCard from "../ItemCard/ItemCard";

const Items = ({ items }) => {
  const [search, setSearch] = useState("");

  const filteredItems = useMemo(() => {
    if (search === "") {
      return items;
    } else {
      return items.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }
  }, [items, search]);

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
        {filteredItems.map((item) => (
          <ItemCard key={nanoid()} item={item} />
        ))}
      </div>
    </section>
  );
};

export default Items;
