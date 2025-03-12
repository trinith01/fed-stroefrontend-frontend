import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Eye, Heart } from "lucide-react";
import { useDispatch } from "react-redux";
import { increment } from "@/lib/features/counter/counterSlice";
import { addToCart } from "@/lib/features/counter/cartSlice";
import { addToFav } from "@/lib/features/counter/favSlice";
import { Separator } from "./ui/separator";
import { Link } from "react-router-dom";

export default function ProductCard( {product} ) {
  const {
    _id,  // Ensure _id is being passed here from the product prop
    category,
    productName,
    price,
    img,
    offerPrice,
    initialStockCount,
    saleCount,
    description,
    favouriteStatus
  } = product;
  

  const [productQty, setProductQty] = useState(initialStockCount - saleCount);
  const [fav, setFav] = useState(favouriteStatus);
  const dispatch = useDispatch();

  const addToCartItems = () => {
    dispatch(addToCart({
      quantity: 1,
      image: img,
      name: productName,
      offerPrice,
      category,
      price,
      _id,  // Ensure you're passing _id correctly here
    }));
    dispatch(increment());
    setProductQty((prev) => prev - 1);
  };

  const handleToggleFav = () => {
    const newFavStatus = !fav;
   

    dispatch(addToFav({
      quantity: 1,
      img,
      category,
      productName,
      offerPrice,
      price,
       _id,  // Ensure you're passing _id correctly here
      favouriteStatus: newFavStatus,
    }));

    setFav(newFavStatus);
  };

  return (
    <Card className="w-full max-w-xs shadow-md rounded-lg">
      <CardContent className="p-4 flex flex-col items-center">
        <Separator className="mb-1" />
        <div className="grid grid-cols-1 justify-start w-full">
          <Heart
            className={`w-6 h-6 ${fav ? "text-red-500 fill-current m-1" : "text-red-200 m-1"}`}
            onClick={handleToggleFav}  // Directly call the function without passing _id explicitly
          />
        </div>

        <div className="h-64 w-full rounded-lg overflow-hidden">
          <img
            src={img}
            alt={productName}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-full mt-4 text-center">
          <h2 className="text-lg font-semibold">{productName}</h2>
          <Separator />
          <p className="text-center">
            {productQty === 0 ? "Out of Stock" : `In Stock: ${productQty}`}
          </p>
          <div className="mt-2">
            {offerPrice ? (
              <>
                <span className="text-sm font-bold text-green-600">
                  ${offerPrice.toFixed(2)}
                </span>
                <span className="text-sm text-gray-500 line-through ml-2">
                  ${price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold">${price.toFixed(2)}</span>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-3">
        <div className="flex gap-2 justify-center">
          <Link to={`/product/${_id}`} className="flex items-center text-blue-500 hover:underline">
            <Eye className="mr-2" />
            View
          </Link>
        </div>

        <Button
          className="w-full"
          onClick={addToCartItems}
          disabled={productQty === 0}
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
