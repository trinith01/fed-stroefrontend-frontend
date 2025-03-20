import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./Pages/Home";
import SignUpPage from "./Pages/SignUp";
import SignInPage from "./Pages/SignIn";
import { ClerkProvider } from "@clerk/clerk-react";
import Favourite from "./Pages/Favourite";
import Product from "./Pages/ProductView";
import Account from "./Pages/Account";
import Shop from "./Pages/Shop";

import CartItems from "./Pages/CartItems";
import { ThemeProvider } from "@/components/theme-provider";
import { Provider } from "react-redux";
import { store } from "./lib/store";
import Admin from "./Pages/Admin";
import AdminLayout from "./components/adminLayout";
import ProductMangement from "./Pages/productMangement";
import CategoryManagement from "./Pages/categoryMangent";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <ClerkProvider publishableKey="pk_test_aW50ZW5zZS1wYW50aGVyLTkyLmNsZXJrLmFjY291bnRzLmRldiQ" afterSignOutUrl="/">
          <Router>
            <Routes>
              <Route path="/sign-in" element={<SignInPage />} />
              <Route path="/sign-up" element={<SignUpPage />} />

              <Route element={<Layout />}>
                <Route path="/admin" element={<Admin />} />

                <Route path="/" element={<Home />} />

                <Route path="/cart" element={<CartItems />} />
                <Route path="/account" element={<Account />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/favourite" element={<Favourite />} />
                <Route
                  path="/product-inventory"
                  element={<ProductMangement />}
                />
                <Route
                  path="/category-management"
                  element={<CategoryManagement />}
                />
                <Route path="/product/:id" element={<Product />} />
              </Route>
            </Routes>
          </Router>
        </ClerkProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
