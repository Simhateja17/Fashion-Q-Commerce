import React, { Suspense, lazy } from "react";

const ProductListing = lazy(() => import("./product_listing"));
const Cart = lazy(() => import("./cart_checkout"));
const OrderTracking = lazy(() => import("./order_tracking"));

export default function App() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Fashion Quick Commerce</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <ProductListing />
        <Cart />
        <OrderTracking />
      </Suspense>
    </div>
  );
}
