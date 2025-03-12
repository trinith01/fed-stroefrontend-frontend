import ProductView from "../components/product-view"
import { useParams } from "react-router-dom";
import { useGetProductsByIdQuery } from "@/lib/api";

export default function Product() {
   const { id } = useParams();
   const { data:product, isLoading, isError } = useGetProductsByIdQuery(id);
   console.log(product);


  return <ProductView product={product} className  />
}

