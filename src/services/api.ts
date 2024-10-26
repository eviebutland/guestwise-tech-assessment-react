export const getRestaurants = async () => {
  try {
    const response = await fetch("http://localhost:3001/restaurants");
    return await response.json();
  } catch (error) {
    throw new Error(`Error fetching restaurants: ${error}`);
  }
};

export const getRestaurantDetails = async (id: number) => {
  try {
    const response = await fetch(`http://localhost:3001/restaurants/${id}`);
    return await response.json();
  } catch (error) {
    throw new Error(`Error fetching restaurant with id (${id}): ${error}`);
  }
};
