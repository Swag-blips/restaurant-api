import { object, string, number } from "yup";

const productSchema = object({
  name: string().required("name of the product is required"),
  price: number()
    .required("Price is required")
    .positive("price should be postitive"),
  category: string().required("Category is required"),
});
