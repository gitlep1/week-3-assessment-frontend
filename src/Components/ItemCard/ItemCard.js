import "./ItemCard.scss";
import { Image } from "react-bootstrap";

const ItemCard = ({ item }) => {
  const renderToppings = () => {
    if (item.toppings.length === 0) {
      return null;
    } else {
      return (
        <div>
          <b>Toppings:</b>
          <br />
          {item.toppings.map((topping, idx) => {
            if (idx === item.toppings.length - 1) {
              return topping;
            } else {
              return topping + ", ";
            }
          })}
        </div>
      );
    }
  };

  return (
    <div className="item-card">
      <h3>{item.name}</h3>
      <Image fluid className="item-card-img" variant="top" src={item.image} />
      <div>
        <h4>{item.shortDescription}</h4>
        <p>
          <b>Price:</b> ${item.price}
        </p>
      </div>
      <div>{renderToppings()}</div>
    </div>
  );
};

export default ItemCard;
