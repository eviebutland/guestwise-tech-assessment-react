import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import RestaurantDetails from "../components/organisms/RestaurantDetails";
import { Button } from "react-bootstrap";

const Restaurant = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState();
  const [isFirstLoad, setIsFirstLoad] = useState(true);

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
      <RestaurantDetails restaurantId={Number(params.id)}></RestaurantDetails>
      {/* book table here */}
    </div>
  );
};

export default Restaurant;
