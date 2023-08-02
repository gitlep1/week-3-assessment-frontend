import "./FoF.scss";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const FoF = () => {
  const navigate = useNavigate();
  return (
    <div className="fof-container">
      <h1>404</h1>
      <h2>Page not found</h2>
      <Button onClick={() => navigate("/")}>Go back</Button>
    </div>
  );
};

export default FoF;
