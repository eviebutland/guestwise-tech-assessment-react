import React, { useState } from "react";
import { Alert, Card, Container, Spinner } from "react-bootstrap";
import { RestaurantDetailsData } from "../../types/restaurant";
import { getRestaurantDetails } from "../../services/api";

type RestaurantDetailsProps = {
  restaurantId: number;
};

interface Details extends RestaurantDetailsData {
  id: string;
}
const RestaurantDetails: React.FC<RestaurantDetailsProps> = ({
  restaurantId,
}) => {
  const [details, setDetails] = useState<Details>();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [displayErrorMessage, setDisplayErrorMessage] = useState(false);
  if (!restaurantId) return null;

  async function handleFetchRestaurantDetails() {
    setIsLoading(true);
    try {
      const response = await getRestaurantDetails(restaurantId);
      setDetails(response.details);
    } catch (error) {
      console.log(error);
      setDisplayErrorMessage(true);
    } finally {
      setIsFirstLoad(false);
      setIsLoading(false);
    }
  }

  if (!details && isFirstLoad && !isLoading) {
    handleFetchRestaurantDetails();
  }
  return (
    <Container>
      <Card>
        {isLoading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <Card.Body>
            {displayErrorMessage || !details ? (
              <Alert variant="danger">Something's gone wrong</Alert>
            ) : (
              <>
                <Card.Title>Restaurant Details</Card.Title>
                <Card.Text>Address: {details.address}</Card.Text>
                <Card.Text>Review Score: {details.reviewScore}</Card.Text>
                <Card.Text>Contact: {details.contactEmail}</Card.Text>
              </>
            )}
          </Card.Body>
        )}
      </Card>
    </Container>
  );
};

export default RestaurantDetails;
