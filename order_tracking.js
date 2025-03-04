import React, { useState } from "react";
import axios from "axios";

export default function OrderTracking() {
  const [orderId, setOrderId] = useState("");
  const [trackingInfo, setTrackingInfo] = useState(null);

  const trackOrder = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/track-order/${orderId}`);
      setTrackingInfo(response.data);
    } catch (error) {
      setTrackingInfo("Failed to fetch tracking details. Try again.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Track Your Order</h1>
      <input
        type="text"
        placeholder="Enter Order ID"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
        className="w-full p-2 border rounded-md mb-2"
      />
      <button
        onClick={trackOrder}
        className="w-full px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
      >
        Track Order
      </button>
      {trackingInfo && <p className="mt-4 text-center font-semibold">{JSON.stringify(trackingInfo)}</p>}
    </div>
  );
}
