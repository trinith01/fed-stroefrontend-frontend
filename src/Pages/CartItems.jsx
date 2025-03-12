"use client";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { CartTable } from "@/components/cartItemTable";
import { Separator } from "@/components/ui/separator";
import { useAddOrderMutation } from "@/lib/api";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { clearCart } from "@/lib/features/counter/cartSlice";
import { v4 as uuidv4 } from 'uuid';
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { AuthPopupAlert } from "@/components/user-popout-alert";
import { useState } from "react";
import { OrderSuccessAnimation } from "@/components/orderSuccessAnimation";

function CartItems() {
  const [showAnimation, setShowAnimation] = useState(false);
  const [orderId, setOrderId] = useState(null); // Store orderId in state
  const { user, isSignedIn } = useUser();
  const [showAuthAlert, setShowAuthAlert] = useState(false);
  const userId = user?.id;
  const dispatch = useDispatch();
  const cartItemsData = useSelector((state) => state.cart.cartItems);
  const [addOrder, { isLoading, isSuccess, isError, error }] = useAddOrderMutation();
  const navigate = useNavigate();

  const handleContinue = () => {
    setShowAnimation(false);
    navigate("/account")
  };

  const makeOrder = async () => {
    console.log("order placed");

    if (!user) {
      setShowAuthAlert(true); // Set the state to show the alert
      return; // Return early, don't proceed with order placement
    }

    const generatedOrderId = `ORDER-${uuidv4().split('-')[0].toUpperCase()}`;
    setOrderId(generatedOrderId); // Set the orderId state

    console.log("orderId", generatedOrderId);
    console.log("userId", user.id);

    const paymentStatus = "Pending";

    const newOrder = {
      orderId: generatedOrderId,
      userId: user.id, // Fetch user ID dynamically
      paymentStatus,
      items: cartItemsData,
      subTotal: subtotal,
      total,
    };

    try {
      const res = await addOrder(newOrder).unwrap();
      console.log("respond", res);

      setShowAnimation(true);
      dispatch(clearCart()); // Clear the cart after order placement
    } catch (err) {
      console.error("Failed to place the order:", err);
      alert("Order failed. Please try again.");
    }
  };

  let subtotal = 0;
  cartItemsData.forEach((item) => {
    if (item.offerPrice) {
      subtotal += item.offerPrice * item.quantity;
    } else {
      subtotal += item.price * item.quantity;
    }
  });

  const shipping = 10; // Flat rate shipping
  const tax = subtotal * 0.1; // Assuming 10% tax
  const total = subtotal + shipping + tax;

  return (
    <div>
      {showAuthAlert && (
        <AuthPopupAlert 
          isOpen={showAuthAlert} 
          onClose={() => setShowAuthAlert(false)} 
        />
      )}
      {showAnimation && (
        <OrderSuccessAnimation show={showAnimation} orderNumber={orderId} onContinue={handleContinue} />
      )}
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            🛒 Shopping Cart
          </h1>
          <Separator className="mt-1 h-0.5" />
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
            <section aria-labelledby="cart-heading" className="lg:col-span-7">
              <h2 id="cart-heading" className="sr-only">
                Items in your shopping cart
              </h2>
              <CartTable cartItemsData={cartItemsData} />
            </section>

            <section
              aria-labelledby="summary-heading"
              className="mt-16 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5 border-2"
            >
              <h2 id="summary-heading" className="text-lg font-medium">
                Order summary
              </h2>
              {cartItemsData.length !== 0 ? (
                <dl className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <dt className="text-sm ">Subtotal</dt>
                    <dd className="text-sm font-medium ">
                      ${subtotal.toFixed(2)}
                    </dd>
                  </div>
                  <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                    <dt className="flex items-center text-sm ">
                      <span>Shipping estimate</span>
                    </dt>
                    <dd className="text-sm font-medium ">
                      ${shipping.toFixed(2)}
                    </dd>
                  </div>
                  <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                    <dt className="flex text-sm 0">
                      <span>Tax estimate</span>
                    </dt>
                    <dd className="text-sm font-medium ">
                      ${tax.toFixed(2)}
                    </dd>
                  </div>
                  <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                    <dt className="text-base font-medium ">
                      Order total
                    </dt>
                    <dd className="text-base font-medium">
                      ${total.toFixed(2)}
                    </dd>
                  </div>
                </dl>
              ) : (
                <div className="flex flex-col items-center justify-center space-y-4 text-gray-600 mt-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                    }}
                  >
                    <ShoppingCart className="w-16 h-16" />
                  </motion.div>
                  <motion.p
                    className="text-center text-xl font-medium"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    Your cart is feeling a bit lonely
                  </motion.p>
                  <motion.p
                    className="text-center text-sm max-w-xs"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    Why not add some items and give it some company? Your
                    perfect picks are just a click away!
                  </motion.p>
                  <motion.button
                    className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link to="/shop">Start Shopping</Link>
                  </motion.button>
                </div>
              )}

              <div className="mt-6">
                <Button
                  onClick={() => {
                    makeOrder();
                  }}
                  size="lg"
                  disabled={cartItemsData.length === 0}
                  className={cartItemsData.length === 0 ? "hidden" : ""}
                >
                  Checkout
                </Button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItems;
