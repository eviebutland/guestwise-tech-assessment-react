import { useParams, useNavigate } from "react-router-dom";
import RestaurantDetails from "../components/organisms/RestaurantDetails";
import { Button } from "react-bootstrap";
import BookTable from "../components/organisms/BookTable";

const Restaurant = () => {
  const params = useParams();
  const navigate = useNavigate();

  const restaurantId = Number(params.restaurantId);

  function handleGoBack() {
    navigate("/");
  }
  return (
    <div>
      <Button onClick={handleGoBack}>Go back</Button>
      <RestaurantDetails restaurantId={restaurantId}></RestaurantDetails>
      <section className="pt-4">
        <BookTable />
      </section>
    </div>
  );
};

export default Restaurant;
