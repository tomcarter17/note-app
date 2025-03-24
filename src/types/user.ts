interface Location {
  city: string;
  postcode: string;
  state: string;
  street: string;
}

export interface User {
  birthdate: number;
  email: string;
  first_name: string;
  gender: string;
  last_name: string;
  location: Location;
  phone_number: string;
  title: string;
  username: string;
}
