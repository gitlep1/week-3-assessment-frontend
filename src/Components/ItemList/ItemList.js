import "./ItemList.scss";
import { nanoid } from "nanoid";

import ItemCard from "../ItemCard/ItemCard";

const Items = ({ items }) => {
  return (
    <section className="items-list-container">
      {items.map((item) => (
        <ItemCard key={nanoid()} item={item} />
      ))}
    </section>
  );
};

export default Items;
