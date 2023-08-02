import "./Navbar.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { BsSun, BsMoon } from "react-icons/bs";
import Cookies from "js-cookie";

const Navbar = ({ switchmode, setSwitchmode }) => {
  const navigate = useNavigate();
  const theme = Cookies.get("theme");

  const [navbarTitle, setNavbarTitle] = useState("Menu Items");
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (theme) {
      if (theme.includes("dark")) {
        setChecked(false);
      } else if (theme.includes("light")) {
        setChecked(true);
      }
      setSwitchmode(JSON.parse(theme));
    } else {
      Cookies.set("theme", JSON.stringify(switchmode));
    }
  }, []); // eslint-disable-line

  const handleSwitchMode = () => {
    if (switchmode === "light") {
      setSwitchmode("dark");
      Cookies.set("theme", JSON.stringify("dark"));
    } else if (switchmode === "dark") {
      setSwitchmode("light");
      Cookies.set("theme", JSON.stringify("light"));
    }
  };

  return (
    <nav className={`${switchmode}-navbar-container`}>
      <h1>{navbarTitle}</h1>

      <Form id="switchModes">
        {switchmode === "light" ? <BsSun /> : <BsMoon />}
        <Form.Check
          type="switch"
          id="custom-switch"
          checked={checked}
          onChange={() => {
            setChecked(!checked);
            handleSwitchMode();
          }}
        />
      </Form>

      <div>
        <Button
          variant={switchmode === "light" ? "dark" : "light"}
          onClick={() => {
            navigate("/");
            setNavbarTitle("Menu Items");
          }}
        >
          Menu Items
        </Button>{" "}
        <Button
          variant={switchmode === "light" ? "dark" : "light"}
          onClick={() => {
            navigate("/favorites");
            setNavbarTitle("Favorites");
          }}
        >
          Favorite Items
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
