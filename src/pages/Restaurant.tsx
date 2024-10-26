import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import RestaurantDetails from "../components/organisms/RestaurantDetails";
import { Button } from "react-bootstrap";
import BookTable from "../components/organisms/BookTable";

const Restaurant = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState();
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const restaurantId = Number(params.restaurantId);
  async function fetchUser() {
    // try {
    //   const response = await fetch("/api/users.json");
    //   const data: User[] = await response.json();
    //   setCurrentUser(data.find((user) => String(user.id) === params.userid));
    // } catch (error) {
    //   console.log("error is here", error);
    // } finally {
    //   setIsFirstLoad(false);
    // }
  }

  if (!restaurant && isFirstLoad) {
    fetchUser();
  }

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
