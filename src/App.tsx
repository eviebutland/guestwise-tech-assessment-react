import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Container, Spinner } from "react-bootstrap";
import RestaurantList from "./components/molecules/RestaurantList";
// import RestaurantDetails from "./components/organisms/RestaurantDetails";
// import BookTable from "./components/organisms/BookTable";
import { Restaurant } from "./types/restaurant";
import { getRestaurants } from "./services/api";

function App() {
  // BUG: refreshing the page clears the restaurants list
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<
    number | null
  >(null);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [initialRestaurants, setInitialRestaurants] = useState<Restaurant[]>(
    [],
  );
  const [isFetchingRestaurants, setIsFetchingRestaurants] = useState(false);

  async function handleGetResturants() {
    setIsFetchingRestaurants(true);
    try {
      const response = await getRestaurants();

      setInitialRestaurants(response);
      setRestaurants(response);
    } catch (error) {
      // display the error here
      console.log(error);
    } finally {
      setIsFetchingRestaurants(false);
      setIsFirstLoad(false);
    }
  }

  if (
    initialRestaurants.length === 0 &&
    isFirstLoad &&
    !isFetchingRestaurants
  ) {
    handleGetResturants();
  }

  function handleDisplaySelectedRestaurant(id: number) {
    setSelectedRestaurantId(id);
  }

  return (
    <Container>
      {isFetchingRestaurants ? (
        <section className="flex my-10 flex-col space-y-10 items-center">
          <h1>One stop Restaurants booking system</h1>
          <p className="text-center">
            We're currently fetching all our restaurants for you!
          </p>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </section>
      ) : (
        <RestaurantList
          restaurants={restaurants}
          onRestaurantSelect={handleDisplaySelectedRestaurant}
        />
      )}
    </Container>
  );
}

export default App;
