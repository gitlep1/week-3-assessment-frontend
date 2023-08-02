import "./ItemCard.scss";
import { useState, useEffect } from "react";
import { Image } from "react-bootstrap";
import Cookies from "js-cookie";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

const ItemCard = ({ item }) => {
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const favorites = Cookies.get("favorites")
      ? JSON.parse(Cookies.get("favorites"))
      : [];
    setFavorite(favorites.some((favItemId) => favItemId === item.id));
  }, [item.id]);

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

  const handleFavorites = () => {
    setFavorite(true);

    const favorites = Cookies.get("favorites")
      ? JSON.parse(Cookies.get("favorites"))
      : [];

    const newFavorites = [...favorites, item.id];
    Cookies.set("favorites", JSON.stringify(newFavorites));
  };

  const handleRemoveFavorites = () => {
    setFavorite(false);

    const favorites = Cookies.get("favorites")
      ? JSON.parse(Cookies.get("favorites"))
      : [];

    const newFavorites = favorites.filter((favItemId) => favItemId !== item.id);
    Cookies.set("favorites", JSON.stringify(newFavorites));
  };

  return (
    <div className="item-card">
      <h3>
        {favorite ? (
          <AiFillStar
            className="star"
            onClick={() => {
              handleRemoveFavorites();
            }}
          />
        ) : (
          <AiOutlineStar className="star" onClick={() => handleFavorites()} />
        )}
        {item.name}
      </h3>
      <Image fluid className="item-card-img" variant="top" src={item.image} />
      <div>
        <h4>{item.shortDescription}</h4>
        <p>
          <b>Price:</b> ${item.price.toFixed(2)}
        </p>
      </div>
      <div>{renderToppings()}</div>
    </div>
  );
};

export default ItemCard;
