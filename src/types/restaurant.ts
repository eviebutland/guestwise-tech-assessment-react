export type Restaurant = {
  id: number;
  name: string;
  shortDescription: string;
  rating: number;
  cuisine: string;
  details: RestaurantDetailsData;
};

export type RestaurantDetailsData = {
  address: string;
  openingHours: {
    weekday: string;
    weekend: string;
  };
  reviewScore: number;
  contactEmail: string;
};
