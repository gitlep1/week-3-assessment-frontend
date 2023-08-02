import "./App.scss";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Container from "./Components/Container/Container";
import Error from "./Components/Error/Error";
import Loading from "./Components/Loading/Loading";

import Navbar from "./Components/Navbar/Navbar";
import ItemList from "./Components/ItemList/ItemList";
import FavItems from "./Components/FavItems/FavItems";
import FoF from "./Components/FourOFour/FoF";

const API = process.env.REACT_APP_API_URL;

const App = () => {
  const [switchmode, setSwitchmode] = useState("dark");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        setError("");
        setLoading(true);
        const response = await fetch(`${API}/items`);
        const json = await response.json();
        const { data, error } = json;

        if (response.ok) {
          setItems(data);
          setLoading(false);
        } else {
          setError(error);
          setLoading(false);
        }
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const renderContent = () => {
    if (loading) {
      return <Loading />;
    } else if (error) {
      return <Error error={error} />;
    } else {
      return (
        <Routes>
          <Route path="/">
            <Route path="/" index element={<ItemList items={items} />} />
            <Route path="/favorites" element={<FavItems items={items} />} />

            <Route path="*" element={<FoF />} />
          </Route>
        </Routes>
      );
    }
  };

  return (
    <section className={`${switchmode}-app`}>
      <Navbar switchmode={switchmode} setSwitchmode={setSwitchmode} />
      <Container center={Boolean(error || loading)} scroll={false}>
        {renderContent()}
      </Container>
    </section>
  );
};

export default App;
