import React, { useState } from "react";
import { Card, Container } from "react-bootstrap";
import { RestaurantDetailsData } from "../../types/restaurant";
import { getRestaurantDetails } from "../../services/api";
// import { getRestaurantDetails } from "../../services/api";

type RestaurantDetailsProps = {
  restaurantId: number;
};

interface Details extends RestaurantDetailsData {
  id: string;
}
const RestaurantDetails: React.FC<RestaurantDetailsProps> = ({
  restaurantId,
}) => {
  console.log(restaurantId);
  const [details, setDetails] = useState<Details>();
  if (!restaurantId) return null;

  // const details = {
  //   address: "123 Fine St, London",
  //   openingHours: {
  //     weekday: "12:00 PM - 10:00 PM",
  //     weekend: "11:00 AM - 11:00 PM",
  //   },
  //   reviewScore: 4.7,
  //   contactEmail: "info@velvetandvine.co.uk",
  // };

  async function handleFetchRestaurantDetails() {
    try {
      const response = await getRestaurantDetails(restaurantId);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Container>
      <Card>
        <Card.Body>
          {details?.id && (
            <>
              <Card.Title>Restaurant Details</Card.Title>
              <Card.Text>Address: {details.address}</Card.Text>
              <Card.Text>Review Score: {details.reviewScore}</Card.Text>
              <Card.Text>Contact: {details.contactEmail}</Card.Text>
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RestaurantDetails;
