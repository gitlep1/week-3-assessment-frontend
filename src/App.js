import "./App.scss";
import { useEffect, useState } from "react";

import Container from "./Components/Container/Container";
import Error from "./Components/Error/Error";
import Loading from "./Components/Loading/Loading";

import ItemList from "./Components/ItemList/ItemList";

const API = process.env.REACT_APP_API_URL;

const App = () => {
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
      return <ItemList items={items} />;
    }
  };

  return (
    <section className="App">
      <h1>week 3 assessment</h1>
      <Container center={Boolean(error || loading)} scroll={false}>
        {renderContent()}
      </Container>
    </section>
  );
};

export default App;
