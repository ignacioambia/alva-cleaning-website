export interface Service {
  client_name: string;
  address: {
    name: string;
    lat: Number;
    lng: Number;
    place_id: string;
  };
  date: Date | null;
  phone: string;
  reference: string;
}
