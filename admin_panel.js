import React, { useState, useEffect } from "react";
import { getActiveVendors } from "./multi_vendor_support";
import { getUserOrderHistory } from "./order_history";

export default function AdminPanel() {
  const [vendors, setVendors] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const vendorData = await getActiveVendors();
      const orderData = await getUserOrderHistory("admin"); // Fetch all orders for admin
      setVendors(vendorData);
      setOrders(orderData);
    }
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Admin Panel</h1>
      <h2 className="text-lg font-semibold mt-4">Vendors</h2>
      <ul>
        {vendors.map(vendor => (
          <li key={vendor.id}>{vendor.vendorName} - {vendor.contactEmail}</li>
        ))}
      </ul>
      <h2 className="text-lg font-semibold mt-4">Orders</h2>
      <ul>
        {orders.map(order => (
          <li key={order.id}>Order ID: {order.id}, Total: ₹{order.total_price}</li>
        ))}
      </ul>
    </div>
  );
}
