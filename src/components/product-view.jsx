import { useState } from "react";
import { Heart, ShoppingCart, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import dummyPic from "../assets/product.jpg";
import { useDispatch } from "react-redux";
import { increment } from "@/lib/features/counter/counterSlice";
import { addToCart } from "@/lib/features/counter/cartSlice";
import { addToFav } from "@/lib/features/counter/favSlice";

let variants = ["S", "M", "L", "XL"];

export default function ProductView({ product }) {
  console.log("product view card:", product);
  const {
    category,
    productName,
    price,
    img,
    offerPrice,
    initialStockCount,
    saleCount,
    description,
    favouriteStatus,
    _id,
  } = product || {};
  const [productQty, setProductQty] = useState(initialStockCount - saleCount);
  const [fav, setFav] = useState(favouriteStatus);
  const dispatch = useDispatch();
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(variants?.[0] || "");

  const discount = product?.offerPrice
    ? Math.round(((product.price - product.offerPrice) / product.price) * 100)
    : 0;

  const handleAddToCart = () => {
    console.log("Added to cart:", {
      ...product,
      selectedQuantity,
      selectedVariant,
    });
    dispatch(
      addToCart({
        quantity: 1,
        image: img,
        name: productName,
        offerPrice,
        category,
        price,
        _id,
      })
    );
    dispatch(increment());
    setProductQty((prev) => prev - 1);
  };
  const handleToggleFav = () => {
    const newFavStatus = !fav;

    dispatch(
      addToFav({
        quantity: 1,
        img,
        category,
        productName,
        offerPrice,
        price,
        _id, // Ensure you're passing _id correctly here
        favouriteStatus: newFavStatus,
      })
    );

    setFav(newFavStatus);
  };

  return (
    <section className="container mx-auto px-4 py-12 flex justify-center">
      <Card className="bg-white shadow-xl rounded-2xl p-8 max-w-screen-lg w-full">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] items-start">
          {/* Product Image */}
          <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100 max-h-96">
            <img
              src={product?.img || dummyPic}
              alt={product?.productName || "Product Image"}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
            {discount > 0 && (
              <Badge className="absolute left-4 top-4 bg-red-500 text-white">
                {discount}% OFF
              </Badge>
            )}
          </div>

          {/* Product Details */}
          <div className="flex flex-col gap-6">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                  {product?.productName}
                </h1>
              
                  <Heart
                    className={`w-6 h-6 ${
                      fav ? "text-red-500 fill-current m-1" : "text-red-200 m-1"
                    }`}
                    onClick={handleToggleFav} // Directly call the function without passing _id explicitly
                  />
               
              </div>

              <div className="flex items-baseline gap-3">
                {product?.offerPrice && (
                  <span className="text-3xl font-bold text-primary">
                    ${product.offerPrice.toFixed(2)}
                  </span>
                )}
                <span
                  className={cn(
                    "text-xl",
                    product?.offerPrice
                      ? "line-through text-gray-400"
                      : "font-bold text-primary"
                  )}
                >
                  ${product?.price}
                </span>
              </div>
            </div>

            <Separator />

            <Button
              size="lg"
              className="mt-4 h-14 text-lg w-full bg-primary text-white hover:bg-primary/90"
              onClick={handleAddToCart}
              disabled={product?.initialStockCount === 0}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>

            <div className="rounded-lg bg-gray-100 p-4 flex items-center gap-3 text-sm">
              <Truck className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-gray-900">Free Shipping</p>
                <p className="text-gray-600">2-3 business days delivery</p>
              </div>
            </div>

            {/* Additional Product Details */}
            <div className="space-y-4">
              <h2 className="font-semibold text-lg text-gray-900">
                Product Details
              </h2>
              <div className="space-y-2 text-sm text-gray-600">
                <p>{product?.description || "No description available."}</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Premium quality materials</li>
                  <li>Ethically manufactured</li>
                  <li>Designed for comfort and durability</li>
                  <li>Easy care instructions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
}
