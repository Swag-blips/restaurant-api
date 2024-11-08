import { object, string, date, number } from "yup";

let restaurantSchema = object({
  name: string().required("name is required").min(4, "Name too short").max(50),
  email: string().required("email is required").email("Invalid email"),
  address: string().required("address is required"),
});

export default restaurantSchema;
