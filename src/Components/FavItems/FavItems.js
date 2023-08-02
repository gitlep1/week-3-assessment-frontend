import "./FavItems.scss";
import { useEffect, useState, useMemo } from "react";
import { Button, Image, Form } from "react-bootstrap";
import { nanoid } from "nanoid";
import Cookies from "js-cookie";

const FavItems = ({ items }) => {
  const favorites = Cookies.get("favorites");

  const [search, setSearch] = useState("");
  const [favoriteItems, setFavoriteItems] = useState([]);

  useEffect(() => {
    if (favorites) {
      const favItemIds = JSON.parse(favorites);
      const favItems = [];

      for (const id of favItemIds) {
        const item = items.find((item) => item.id === id);
        if (item) {
          favItems.push(item);
        }
      }

      setFavoriteItems(favItems);
    }
  }, []); // eslint-disable-line

  const filteredItems = useMemo(() => {
    if (search === "") {
      return favoriteItems;
    } else {
      return favoriteItems.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }
  }, [favoriteItems, search]);

  const renderToppings = (item) => {
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

  const handleRemoveFavorites = (item) => {
    const favorites = Cookies.get("favorites")
      ? JSON.parse(Cookies.get("favorites"))
      : [];

    const removeFavFromCookie = favorites.filter(
      (favItemId) => favItemId !== item.id
    );
    const newFavorites = favoriteItems.filter(
      (favItem) => favItem.id !== item.id
    );
    setFavoriteItems(newFavorites);

    Cookies.set("favorites", JSON.stringify(removeFavFromCookie));
  };

  return (
    <section className="fav-items-container">
      <Form className="fav-items-searchbar">
        <Form.Group controlId="formBasicSearch">
          <Form.Control
            type="text"
            placeholder="Input Item Name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Form.Group>
      </Form>

      <div className="favorites-list">
        {favoriteItems.length > 0 ? (
          filteredItems.map((item) => {
            return (
              <div key={nanoid()} className="fav-item-card">
                <h3>{item.name}</h3>
                <Image
                  fluid
                  className="fav-item-card-img"
                  variant="top"
                  src={item.image}
                />
                <div>
                  <h4>{item.shortDescription}</h4>
                  <p>
                    <b>Price:</b> ${item.price.toFixed(2)}
                  </p>
                </div>
                <div>{renderToppings(item)}</div>
                <br />
                <Button
                  className="remove-button"
                  variant="danger"
                  onClick={() => handleRemoveFavorites(item)}
                >
                  Remove from Favorites
                </Button>
              </div>
            );
          })
        ) : (
          <h1 className="noFavs">You have not favorited any items yet.</h1>
        )}
      </div>
    </section>
  );
};

export default FavItems;
