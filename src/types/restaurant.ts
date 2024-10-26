export type Restaurant = {
  id: number;
  name: string;
  shortDescription: string;
  rating: number;
  cuisine: string;
  details: RestaurantDetailsData;
};

export interface RestaurantDetailsData {
  address: string;
  openingHours: {
    weekday: string;
    weekend: string;
  };
  reviewScore: number;
  contactEmail: string;
}
