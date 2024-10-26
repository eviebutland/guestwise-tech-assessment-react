import React, { useState } from "react";
import { Badge, Alert, Button, ButtonProps } from "react-bootstrap";
import { Restaurant } from "../../types/restaurant";

type RestaurantListProps = {
  onRestaurantSelect: (id: number) => void;
  restaurants: Restaurant[];
};

const RestaurantList: React.FC<RestaurantListProps> = ({
  onRestaurantSelect,
  restaurants,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [allRestaurants, setAllRestaurants] =
    useState<Restaurant[]>(restaurants);

  function handleSelectRestaurant(id: number) {
    onRestaurantSelect(id);
  }

  function filterRestaurantsBySearchQuery(
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) {
    setSearchQuery(e.target.value);
    if (e.target.value === "") {
      setAllRestaurants(restaurants);
    } else {
      setAllRestaurants(
        restaurants.filter((user) => {
          return user.name.toLowerCase().includes(e.target.value.toLowerCase());
        }),
      );
    }
  }

  function handleReset() {
    setSearchQuery("");
    setAllRestaurants(restaurants);
  }

  // TODO: maybe move out to own component?
  const ratings = [5, 4, 3, 2, 1];

  function handleFilterByRating(rating: number) {
    setAllRestaurants(
      allRestaurants.filter((restaurant) => restaurant.rating >= rating),
    );
  }

  function ratingVariant(rating: number) {
    let variant: ButtonProps["variant"] = "info";
    switch (rating) {
      case 5:
      case 4:
        variant = "success";
        break;
      case 3:
      case 2:
        variant = "warning";
        break;
      case 1:
        variant = "danger";
        break;
    }
    return variant;
  }

  return (
    <div>
      <h2 className="p-8 text-xl">Restaurants</h2>

      <div className="w-full px-8 md:flex gap-2">
        <input
          className="border w-full p-2"
          value={searchQuery}
          placeholder="Filter restaurants by name"
          onChange={filterRestaurantsBySearchQuery}
        />

        <Button variant="danger" onClick={handleReset}>
          Clear
        </Button>
      </div>

      <div className="mt-6 px-8 flex flex-wrap gap-2">
        {ratings.map((rating) => (
          <Button
            key={rating}
            variant={`outline-${ratingVariant(rating)}`}
            onClick={() => handleFilterByRating(rating)}
          >
            {rating}/5 +
          </Button>
        ))}
      </div>

      {allRestaurants.length ? (
        <ul className="p-8 md:grid grid-cols-4 gap-4">
          {allRestaurants.map((restaurant) => (
            <li className="border rounded p-4" key={restaurant.id}>
              <a href={`/restaurant/${restaurant.id}`}>
                <div className="bg-gray-200 p-8 text-center mb-2">
                  Image here
                </div>
                <h5>{restaurant.name}</h5>
                <p>{restaurant.shortDescription}</p>
                <Badge bg={restaurant.rating > 4 ? "success" : "warning"}>
                  {restaurant.rating}
                </Badge>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <div className="p-8">
          <Alert variant="warning">
            No restaurants matching this search, please try again!
          </Alert>
        </div>
      )}
      {/* TODO: add 'Load more' button to fetch more and render at bottom (like e-commerce sites) */}
    </div>
  );
};

export default RestaurantList;
