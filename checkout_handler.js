import React, { useState } from "react";
import { placeOrder } from "./checkout_api";

export default function CheckoutHandler() {
  const [cart] = useState([
    { id: 1, name: "Trendy T-Shirt", price: 499, quantity: 1 },
    { id: 2, name: "Stylish Jeans", price: 999, quantity: 1 },
  ]);
  const [orderStatus, setOrderStatus] = useState(null);

  const handleCheckout = async () => {
    try {
      const response = await placeOrder(cart, "USER123");
      setOrderStatus(`Order placed successfully! Order ID: ${response.order_id}`);
    } catch (error) {
      setOrderStatus("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Checkout</h1>
      <button
        onClick={handleCheckout}
        className="w-full px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
      >
        Confirm & Pay
      </button>
      {orderStatus && <p className="mt-4 text-center font-semibold">{orderStatus}</p>}
    </div>
  );
}
